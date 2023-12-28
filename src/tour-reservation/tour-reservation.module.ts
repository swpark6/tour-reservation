import { Module } from '@nestjs/common';
import { CreateTourReservationService } from './application/services/create-tour-reseravtion.service';
import { TourReservationFactory } from './domain/factories/tour-reservation.factory';
import { OrmTourReservationModule } from './infra/persistence/orm/orm-tour-reservation.module';
import { TourReservationController } from './presenters/http/tour-reservation.controller';

@Module({
  imports: [OrmTourReservationModule],
  controllers: [TourReservationController],
  providers: [CreateTourReservationService, TourReservationFactory],
})
export class TourReservationModule {}
