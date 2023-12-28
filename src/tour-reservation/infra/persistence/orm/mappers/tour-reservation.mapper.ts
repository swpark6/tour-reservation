import { TourReservation } from 'src/tour-reservation/domain/tour-reservation';
import { TourReservationEntity } from '../entities/tour-reservation.entity';

export class TourReservationMapper {
  static toDomain(entity: TourReservationEntity): TourReservation {
    const { id, tourId, userId, startAt } = entity;

    const domain = new TourReservation(id, tourId, userId, startAt);

    return domain;
  }

  static toPersistence(domain: TourReservation): TourReservationEntity {
    const { id, tourId, userId, startAt } = domain;

    const entity = new TourReservationEntity();

    entity.id = id;
    entity.tourId = tourId;
    entity.userId = userId;
    entity.startAt = startAt;

    return entity;
  }
}
