import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourRepositoryPort } from 'src/tour/application/ports/tour.repository.port';
import { TourEntity } from './entities/tour.entity';
import { OrmTourRepository } from './repositories/orm-tour.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TourEntity])],
  providers: [
    {
      provide: TourRepositoryPort,
      useClass: OrmTourRepository,
    },
  ],
  exports: [TourRepositoryPort],
})
export class OrmTourModule {}
