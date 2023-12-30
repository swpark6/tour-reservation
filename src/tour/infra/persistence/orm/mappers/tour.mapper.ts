import { Tour } from 'src/tour/domain/tour';
import { HolydayVo } from 'src/tour/domain/valud-object/holyday.vo';
import { TourEntity } from '../entities/tour.entity';

export class TourMapper {
  static toDomain(entity: TourEntity): Tour {
    if (!entity) {
      return null;
    }

    const { id, holydays } = entity;

    const domain = new Tour(id);
    domain.holidays =
      typeof holydays === 'string'
        ? holydays.split(',').map((holyday) => new HolydayVo(holyday))
        : [];

    return domain;
  }

  static toPersistence(domain: Tour): TourEntity {
    const { id, holidays } = domain;

    const entity = new TourEntity();
    entity.id = id;
    entity.holydays = holidays.map((holyday) => holyday.value).toString();

    return entity;
  }
}
