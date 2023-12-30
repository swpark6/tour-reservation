import { TourReservation } from 'src/tour-reservation/domain/tour-reservation';

export abstract class TourReservationRepositoryPort {
  abstract save(tourReservation: TourReservation): Promise<TourReservation>;
  abstract findOneById(tourReservationId: string): Promise<TourReservation>;
  abstract countByTourIdAndStartAt(
    tourId: string,
    startAt: Date,
  ): Promise<number>;
}
