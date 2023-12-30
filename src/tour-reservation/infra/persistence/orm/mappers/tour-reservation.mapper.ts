import { TourReservation } from 'src/tour-reservation/domain/tour-reservation';
import { TourReservationEntity } from '../entities/tour-reservation.entity';

export class TourReservationMapper {
  static toDomain(entity: TourReservationEntity): TourReservation {
    if (!entity) {
      return null;
    }

    const {
      id,
      tourId,
      userId,
      startAt,
      cancellationDueDate,
      canceledAt,
      approvedAt,
    } = entity;

    const domain = new TourReservation(
      id,
      tourId,
      userId,
      startAt,
      cancellationDueDate,
      canceledAt,
      approvedAt,
    );

    return domain;
  }

  static toPersistence(domain: TourReservation): TourReservationEntity {
    const {
      id,
      tourId,
      userId,
      startAt,
      cancellationDueDate,
      canceledAt,
      approvedAt,
    } = domain;

    const entity = new TourReservationEntity();

    entity.id = id;
    entity.tourId = tourId;
    entity.userId = userId;
    entity.startAt = startAt;
    entity.cancellationDueDate = cancellationDueDate;
    entity.canceledAt = canceledAt;
    entity.approvedAt = approvedAt;

    return entity;
  }
}
