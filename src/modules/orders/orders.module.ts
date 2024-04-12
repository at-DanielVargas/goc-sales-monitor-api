import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { HttpModule } from '@nestjs/axios';

import { AuthModule } from '../auth/auth.module';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [OrdersController],
  providers: [OrdersService, EventsGateway],
})
export class OrdersModule {}
