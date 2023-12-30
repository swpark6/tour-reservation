import { Module } from '@nestjs/common';
import { TourReservationCreatedEventHandler } from './application/event-hanlders/tour-reservation-created.event-handler';
import { ApproveTourReservationService } from './application/services/approve-tour-reservation.service';
import { CancelTourReservationService } from './application/services/cancel-tour-reservation.service';
import { CreateTourReservationService } from './application/services/create-tour-reseravtion.service';
import { TourReservationFactory } from './domain/factories/tour-reservation.factory';
import { OrmTourReservationModule } from './infra/persistence/orm/orm-tour-reservation.module';
import { ApproveTourReservationController } from './presenters/http/approve-tour-reservation.controller';
import { CancelTourReservationController } from './presenters/http/cancel-tour-reservation.controller';
import { TourReservationController } from './presenters/http/tour-reservation.controller';

@Module({
  imports: [OrmTourReservationModule],
  controllers: [
    TourReservationController,
    CancelTourReservationController,
    ApproveTourReservationController,
  ],
  providers: [
    TourReservationFactory,
    CreateTourReservationService,
    CancelTourReservationService,
    ApproveTourReservationService,
    TourReservationCreatedEventHandler,
  ],
})
export class TourReservationModule {}
