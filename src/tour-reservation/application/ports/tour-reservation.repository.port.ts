import { TourReservation } from 'src/tour-reservation/domain/tour-reservation';

export abstract class TourReservationRepositoryPort {
  abstract save(tourReservation: TourReservation): Promise<TourReservation>;
}
