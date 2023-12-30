import { Module } from '@nestjs/common';
import { GetAvailableSchedulesService } from './application/services/get-available-schedules.service';
import { OrmTourModule } from './infra/persistence/orm/orm-tour.module';
import { GetAvailableSchedulesController } from './presenters/http/get-available-schedules.controller';

@Module({
  imports: [OrmTourModule],
  controllers: [GetAvailableSchedulesController],
  providers: [GetAvailableSchedulesService],
})
export class TourModule {}
