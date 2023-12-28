import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { TourReservation } from '../tour-reservation';

@Injectable()
export class TourReservationFactory {
  create(tourId: string, userId: string, startAt: Date) {
    const tourReservationId = randomUUID();

    const tourReservation = new TourReservation(
      tourReservationId,
      tourId,
      userId,
      startAt,
    );

    return tourReservation;
  }
}
