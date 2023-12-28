import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourReservationRepositoryPort } from 'src/tour-reservation/application/ports/tour-reservation.repository.port';
import { TourReservationEntity } from './entities/tour-reservation.entity';
import { OrmTourReservationRepository } from './repositories/orm-tour-reservation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TourReservationEntity])],
  providers: [
    {
      provide: TourReservationRepositoryPort,
      useClass: OrmTourReservationRepository,
    },
  ],
  exports: [TourReservationRepositoryPort],
})
export class OrmTourReservationModule {}
