import { Module } from '@nestjs/common';
import { AllSubscriber } from './subscribers/all.subscriber';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [AllSubscriber],
  exports: [],
})
export class BroadcastModule {}
