import { ConflictException } from '@nestjs/common';
import { TourReservation } from '../tour-reservation';

export class AlreadyCanceledException extends ConflictException {
  constructor(tourReservation: TourReservation) {
    super(`Already canceledAt=${tourReservation.canceledAt} `);
  }
}
