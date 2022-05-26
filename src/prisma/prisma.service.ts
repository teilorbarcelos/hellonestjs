import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Global,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Global()
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  logger = new Logger(PrismaService.name);

  async onModuleInit() {
    this.logger.log('Prisma Module Initialized');
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
