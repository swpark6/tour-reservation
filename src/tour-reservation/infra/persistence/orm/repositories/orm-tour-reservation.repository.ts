import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TourReservationRepositoryPort } from 'src/tour-reservation/application/ports/tour-reservation.repository.port';
import { TourReservation } from 'src/tour-reservation/domain/tour-reservation';
import { Between, IsNull, Not, Repository } from 'typeorm';
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

  countByTourIdAndStartAt(tourId: string, startAt: Date): Promise<number> {
    const h24 = 1000 * 60 * 60 * 24;

    return this.repository.count({
      where: {
        tourId,
        startAt: Between(startAt, new Date(startAt.getTime() + h24 - 1)), // Between: startAt <= :startAt <= startAt+24h-1ms
        approvedAt: Not(IsNull()),
        canceledAt: IsNull(),
      },
    });
  }
}
