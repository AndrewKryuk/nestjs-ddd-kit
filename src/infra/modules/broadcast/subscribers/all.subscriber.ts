import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  SoftRemoveEvent,
} from 'typeorm';
import { UpdateEvent } from 'typeorm/subscriber/event/UpdateEvent';
import { OnModuleInit } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import * as process from 'process';
import { context, trace } from '@opentelemetry/api';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { BroadcastConfigAbstract } from '../../../../application/abstract/configuration/broadcast-config.abstract';
import { TTypeormEvent } from '../types/typeorm-event.type';
import { ProducerAdapterAbstract } from '../../../../domain/abstract/adapters/producer-adapter.abstract';
import { camelToSnake } from '../../../../application/utils/camel-to-snake';
import { BaseTypeOrmEntity } from '../../../base/base-type-orm.entity';
import { IBroadcastProps } from '../../../../domain/interfaces/broadcast/broadcast-props.interface';
import { IBroadcastMessage } from '../../../../domain/interfaces/broadcast/broadcast-message.interface';
import { StorageServiceAbstract } from '../../../../domain/abstract/services/storage-service.abstract';
import { CLS_GRPC_CONTEXT } from '../../../../domain/tokens/cls.tokens';

@EventSubscriber()
export class AllSubscriber implements EntitySubscriberInterface, OnModuleInit {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly producerAdapter: ProducerAdapterAbstract,
    private readonly storageService: StorageServiceAbstract,
    private readonly broadcastConfig: BroadcastConfigAbstract,
  ) {}

  onModuleInit(): void {
    this.dataSource.subscribers.push(this);
  }

  private getProps(event: TTypeormEvent): IBroadcastProps {
    const { SERVICE_NAME: service } = process.env;

    const model =
      event.entity?.constructor.name.toLowerCase().replace('entity', '') ?? '';

    const entityId = event?.entity?.['id'] || event?.['entityId'];

    const { traceId: requestId } = trace
      .getSpan(context.active())
      ?.spanContext() ?? { traceId: '' };

    const key = `${service}:${model}:${entityId}`;

    const broadcastProps: IBroadcastProps = {
      model,
      service: service ?? '',
      entityId,
      requestId,
      key,
    };

    const grpcContext =
      this.storageService.get<ExecutionContextHost>(CLS_GRPC_CONTEXT);
    if (grpcContext) {
      const metadata = grpcContext.getArgByIndex(1);
      broadcastProps.userId = metadata.get('user-id')[0] || null;
    }

    return broadcastProps;
  }

  private emit(key: string, value: IBroadcastMessage): Promise<void> {
    return this.producerAdapter.produce(
      { key, value: camelToSnake(value) },
      this.broadcastConfig.kafkaTopic,
    );
  }

  async afterInsert(event: InsertEvent<BaseTypeOrmEntity>) {
    const { model, service, requestId, entityId, userId, key } =
      this.getProps(event);

    const broadcastMessage: IBroadcastMessage = {
      id: entityId,
      service,
      requestId,
      userId,
      model,
      operation: 'create',
      prevState: {},
      newState: event.entity.toJSON(),
    };

    await this.emit(key, broadcastMessage);
  }

  async afterUpdate(event: UpdateEvent<BaseTypeOrmEntity>) {
    const { model, service, requestId, entityId, userId, key } =
      this.getProps(event);

    const newState = event.entity?.toJSON() ?? {};

    const prevState = Object.keys(newState).reduce((accumulator, key) => {
      !!key && (accumulator[key] = event.databaseEntity[key]);

      return accumulator;
    }, {});

    const broadcastMessage: IBroadcastMessage = {
      id: entityId,
      service,
      requestId,
      userId,
      model,
      operation: 'update',
      prevState,
      newState,
    };

    await this.emit(key, broadcastMessage);
  }

  async afterRemove(event: RemoveEvent<BaseTypeOrmEntity>) {
    const { model, service, requestId, entityId, userId, key } =
      this.getProps(event);

    const broadcastMessage: IBroadcastMessage = {
      id: entityId,
      service,
      requestId,
      userId,
      model,
      operation: 'delete',
      prevState: event.databaseEntity.toJSON(),
      newState: {},
    };

    await this.emit(key, broadcastMessage);
  }

  async afterSoftRemove(event: SoftRemoveEvent<BaseTypeOrmEntity>) {
    await this.afterRemove(event);
  }
}
