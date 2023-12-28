import { TourReservation } from 'src/tour-reservation/domain/tour-reservation';
import { TourReservationEntity } from '../entities/tour-reservation.entity';

export class TourReservationMapper {
  static toDomain(entity: TourReservationEntity): TourReservation {
    const { id, tourId, userId } = entity;

    const domain = new TourReservation(id, tourId, userId);

    return domain;
  }

  static toPersistence(domain: TourReservation): TourReservationEntity {
    const { id, tourId, userId } = domain;

    const entity = new TourReservationEntity();

    entity.id = id;
    entity.tourId = tourId;
    entity.userId = userId;

    return entity;
  }
}
