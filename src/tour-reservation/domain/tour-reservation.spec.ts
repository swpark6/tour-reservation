import { fail } from 'assert';
import { CanNotCancelException } from './exceptions/can-not-cancel.exception';
import { TourReservationFactory } from './factories/tour-reservation.factory';

describe('TourReservation Spec', () => {
  let factory: TourReservationFactory;

  beforeEach(() => {
    factory = new TourReservationFactory();
  });

  describe('cancel', () => {
    it('cancel', () => {
      // Given
      const tourId = 'VALID_TOUR_ID';
      const userId = 'VALID_USER_ID';
      const startAt = '2024-01-03T00:00:00.000-10:00'; // 24.01.03 HST

      const tourReservation = factory.create(tourId, userId, startAt);

      const now = new Date('2024-01-01T18:59:59.999+09:00');

      // When
      tourReservation.cancel(now);

      // Then
      expect(tourReservation.canceledAt).toBe(now);
    });

    it('throw CanNotCancelException', () => {
      // Given
      const tourId = 'VALID_TOUR_ID';
      const userId = 'VALID_USER_ID';
      const startAt = '2024-01-03T00:00:00.000-10:00'; // 24.01.03 HST

      const tourReservation = factory.create(tourId, userId, startAt);

      const now = new Date('2024-01-01T19:00:00.000+09:00');
      // When
      try {
        tourReservation.cancel(now);
        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(CanNotCancelException);
        expect(e.message).toEqual(
          'now=2024-01-01T10:00:00.000Z, cancellationDueDate=2024-01-01T10:00:00.000Z',
        );
      }
    });
  });
});
