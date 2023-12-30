import { Tour } from 'src/tour/domain/tour';
import { TourEntity } from '../entities/tour.entity';

export class TourMapper {
  static toDomain(entity: TourEntity): Tour {
    if (!entity) {
      return null;
    }

    const { id } = entity;

    const domain = new Tour(id);

    return domain;
  }

  static toPersistence(domain: Tour): TourEntity {
    const { id } = domain;

    const entity = new TourEntity();
    entity.id = id;

    return entity;
  }
}
