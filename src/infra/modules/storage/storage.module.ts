import { Global, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { storageProviders } from './storage.providers';

@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: false,
      },
    }),
  ],
  providers: [...storageProviders],
  exports: [...storageProviders],
})
export class StorageModule {}
