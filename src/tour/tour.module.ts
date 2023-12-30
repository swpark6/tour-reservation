import { Module } from '@nestjs/common';
import { TourHolydaysUpdatedEventHandler } from './application/event-handlers/tour-holydays-updated.event-handler';
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
  providers: [
    GetAvailableSchedulesService,
    SetHolydaysService,
    GetTourService,
    TourHolydaysUpdatedEventHandler,
  ],
})
export class TourModule {}
