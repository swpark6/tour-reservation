import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TourReservationRepositoryPort } from 'src/tour-reservation/application/ports/tour-reservation.repository.port';
import { TourReservation } from 'src/tour-reservation/domain/tour-reservation';
import { Repository } from 'typeorm';
import { TourReservationEntity } from '../entities/tour-reservation.entity';
import { TourReservationMapper } from '../mappers/tour-reservation.mapper';

@Injectable()
export class OrmTourReservationRepository
  implements TourReservationRepositoryPort
{
  constructor(
    @InjectRepository(TourReservationEntity)
    private readonly repository: Repository<TourReservationEntity>,
  ) {}

  async save(tourReservation: TourReservation): Promise<TourReservation> {
    const entity = TourReservationMapper.toPersistence(tourReservation);

    const newEntity = await this.repository.save(entity);

    return TourReservationMapper.toDomain(newEntity);
  }

  async findOneById(tourReservationId: string): Promise<TourReservation> {
    const entity = await this.repository.findOne({
      where: { id: tourReservationId },
    });

    return TourReservationMapper.toDomain(entity);
  }
}
