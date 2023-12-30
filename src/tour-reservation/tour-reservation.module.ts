import { Module } from '@nestjs/common';
import { CancelTourReservationService } from './application/services/cancel-tour-reservation.service';
import { CreateTourReservationService } from './application/services/create-tour-reseravtion.service';
import { TourReservationFactory } from './domain/factories/tour-reservation.factory';
import { OrmTourReservationModule } from './infra/persistence/orm/orm-tour-reservation.module';
import { CancelTourReservationController } from './presenters/http/cancel-tour-reservation.controller';
import { TourReservationController } from './presenters/http/tour-reservation.controller';

@Module({
  imports: [OrmTourReservationModule],
  controllers: [TourReservationController, CancelTourReservationController],
  providers: [
    TourReservationFactory,
    CreateTourReservationService,
    CancelTourReservationService,
  ],
})
export class TourReservationModule {}
