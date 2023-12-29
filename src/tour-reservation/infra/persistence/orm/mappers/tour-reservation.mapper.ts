import { TourReservation } from 'src/tour-reservation/domain/tour-reservation';
import { TourReservationEntity } from '../entities/tour-reservation.entity';

export class TourReservationMapper {
  static toDomain(entity: TourReservationEntity): TourReservation {
    if (!entity) {
      return null;
    }

    const { id, tourId, userId, startAt, canceledAt } = entity;

    const domain = new TourReservation(id);
    domain.tourId = tourId;
    domain.userId = userId;
    domain.startAt = startAt;
    domain.canceledAt = canceledAt;

    return domain;
  }

  static toPersistence(domain: TourReservation): TourReservationEntity {
    const { id, tourId, userId, startAt, canceledAt } = domain;

    const entity = new TourReservationEntity();

    entity.id = id;
    entity.tourId = tourId;
    entity.userId = userId;
    entity.startAt = startAt;
    entity.canceledAt = canceledAt;

    return entity;
  }
}
