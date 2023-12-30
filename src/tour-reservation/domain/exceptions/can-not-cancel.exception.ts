import { ConflictException } from '@nestjs/common';
import { TourReservation } from '../tour-reservation';

export class CanNotCancelException extends ConflictException {
  constructor(now: Date, tourReservation: TourReservation) {
    super(
      `now=${now.toISOString()}, cancellationDueDate=${tourReservation.cancellationDueDate.toISOString()}`,
    );
  }
}
