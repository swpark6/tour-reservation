import { Module } from '@nestjs/common';
import { CreateTourReservationService } from './application/services/create-tour-reseravtion.service';
import { OrmTourReservationModule } from './infra/persistence/orm/orm-tour-reservation.module';

@Module({
  imports: [OrmTourReservationModule],
  controllers: [],
  providers: [CreateTourReservationService],
})
export class TourReservationModule {}
