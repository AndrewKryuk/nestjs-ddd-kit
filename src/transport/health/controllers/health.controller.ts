import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';
import { Log } from '../../../application/decorators/log.decorator';

@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService) {}

  @Get()
  @HealthCheck()
  @Log({ level: 'trace' })
  check() {
    return this.health.check([]);
  }
}
