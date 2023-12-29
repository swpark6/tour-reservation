import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as moment from 'moment';
import { TourReservation } from '../tour-reservation';

@Injectable()
export class TourReservationFactory {
  private static CANCELLATION_PERIOD = 3; // 3days

  create(tourId: string, userId: string, startAt: string) {
    const tourReservationId = randomUUID();

    const startAtDate = moment.parseZone(startAt).startOf('day').toDate();

    const cancellationDueDate = new Date(
      moment
        .parseZone(startAt)
        .subtract(TourReservationFactory.CANCELLATION_PERIOD - 1, 'day') // 시작일 N일전까지 취소가 가능하므로 취소 가능 마감일은 N-1
        .startOf('day')
        .format(),
    );

    const tourReservation = new TourReservation(
      tourReservationId,
      tourId,
      userId,
      startAtDate,
      cancellationDueDate,
      null,
    );

    return tourReservation;
  }
}
