import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

@Global()
@Module({})
export class ConfigurationModule {
  static forRoot(providers: Provider[]): DynamicModule {
    return {
      module: ConfigurationModule,
      providers: [...providers],
      exports: [...providers],
    };
  }
}
