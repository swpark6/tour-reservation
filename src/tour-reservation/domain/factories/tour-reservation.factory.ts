import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as moment from 'moment';
import { TourReservation } from '../tour-reservation';

@Injectable()
export class TourReservationFactory {
  private static CANCELLATION_PERIOD = 3; // 3days

  create(tourId: string, userId: string, startAt: string) {
    const tourReservationId = randomUUID();

    const tourReservation = new TourReservation(tourReservationId);

    tourReservation.tourId = tourId;
    tourReservation.userId = userId;
    tourReservation.startAt = moment.parseZone(startAt).startOf('day').toDate();

    // 취소일
    tourReservation.cancellationDueDate = new Date(
      moment
        .parseZone(startAt)
        .subtract(TourReservationFactory.CANCELLATION_PERIOD - 1, 'day') // 시작일 N일전까지 취소가 가능하므로 취소 가능 마감일은 N-1
        .startOf('day')
        .format(),
    );
    tourReservation.canceledAt = null;

    return tourReservation;
  }
}
