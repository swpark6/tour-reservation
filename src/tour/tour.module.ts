import { Module } from '@nestjs/common';
import { GetAvailableSchedulesService } from './application/services/get-available-schedules.service';
import { SetHolydaysService } from './application/services/set-holydays.service';
import { OrmTourModule } from './infra/persistence/orm/orm-tour.module';
import { GetAvailableSchedulesController } from './presenters/http/get-available-schedules.controller';
import { SetHolydaysController } from './presenters/http/set-holyday.controller';

@Module({
  imports: [OrmTourModule],
  controllers: [GetAvailableSchedulesController, SetHolydaysController],
  providers: [GetAvailableSchedulesService, SetHolydaysService],
})
export class TourModule {}
