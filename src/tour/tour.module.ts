import { Module } from '@nestjs/common';
import { GetAvailableSchedulesService } from './application/services/get-available-schedules.service';
import { GetTourService } from './application/services/get-tour.service';
import { SetHolydaysService } from './application/services/set-holydays.service';
import { OrmTourModule } from './infra/persistence/orm/orm-tour.module';
import { GetAvailableSchedulesController } from './presenters/http/get-available-schedules.controller';
import { SetHolydaysController } from './presenters/http/set-holyday.controller';
import { GetTourController } from './presenters/http/tour.controller';

@Module({
  imports: [OrmTourModule],
  controllers: [
    GetAvailableSchedulesController,
    SetHolydaysController,
    GetTourController,
  ],
  providers: [GetAvailableSchedulesService, SetHolydaysService, GetTourService],
})
export class TourModule {}
