import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TourRepositoryPort } from 'src/tour/application/ports/tour.repository.port';
import { Tour } from 'src/tour/domain/tour';
import { Repository } from 'typeorm';
import { TourEntity } from '../entities/tour.entity';
import { TourMapper } from '../mappers/tour.mapper';

@Injectable()
export class OrmTourRepository implements TourRepositoryPort {
  constructor(
    @InjectRepository(TourEntity)
    private readonly repository: Repository<TourEntity>,
  ) {}

  async findOneById(tourId: string): Promise<Tour> {
    const entity = await this.repository.findOne({
      where: {
        id: tourId,
      },
    });

    return TourMapper.toDomain(entity);
  }

  async save(tour: Tour): Promise<Tour> {
    const entity = TourMapper.toPersistence(tour);

    const newEntity = await this.repository.save(entity);

    return TourMapper.toDomain(newEntity);
  }
}
