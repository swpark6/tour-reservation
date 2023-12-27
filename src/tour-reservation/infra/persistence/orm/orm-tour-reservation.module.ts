import { Module } from '@nestjs/common';
import { TourReservationRepositoryPort } from 'src/tour-reservation/application/ports/tour-reservation.repository.port';
import { OrmTourReservationRepository } from './repositories/orm-tour-reservation.repository';

@Module({
  providers: [
    {
      provide: TourReservationRepositoryPort,
      useClass: OrmTourReservationRepository,
    },
  ],
  exports: [TourReservationRepositoryPort],
})
export class OrmTourReservationModule {}
