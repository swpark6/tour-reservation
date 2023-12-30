import { Tour } from 'src/tour/domain/tour';
import { HolydayOfWeekVo } from 'src/tour/domain/valud-object/holyday-of-week.vo';
import { HolydayVo } from 'src/tour/domain/valud-object/holyday.vo';
import { TourEntity } from '../entities/tour.entity';

export class TourMapper {
  static toDomain(entity: TourEntity): Tour {
    if (!entity) {
      return null;
    }

    const { id, holydays, holydaysOfWeek } = entity;

    const domain = new Tour(id);
    domain.holidays =
      typeof holydays === 'string'
        ? holydays.split(',').map((holyday) => new HolydayVo(holyday))
        : [];
    domain.holydaysOfWeek =
      typeof holydaysOfWeek === 'string'
        ? holydaysOfWeek
            .split(',')
            .map(
              (holydayOfWeek) => new HolydayOfWeekVo(parseInt(holydayOfWeek)),
            )
        : [];

    return domain;
  }

  static toPersistence(domain: Tour): TourEntity {
    const { id, holidays, holydaysOfWeek } = domain;

    const entity = new TourEntity();
    entity.id = id;
    entity.holydays =
      holidays.length === 0
        ? null
        : holidays.map((holyday) => holyday.value).toString();
    entity.holydaysOfWeek =
      holydaysOfWeek.length === 0
        ? null
        : holydaysOfWeek.map((holydayOfWeek) => holydayOfWeek.value).toString();

    return entity;
  }
}
