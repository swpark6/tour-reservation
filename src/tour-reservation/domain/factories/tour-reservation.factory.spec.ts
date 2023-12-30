import { TourReservationFactory } from './tour-reservation.factory';

describe('TourReservationFactory Spec', () => {
  let sut: TourReservationFactory;

  beforeEach(() => {
    sut = new TourReservationFactory();
  });

  describe('create()', () => {
    describe('여행시작일, 취소마감일 timezone test', () => {
      it('(startAt=2024-01-02T15:00:00.000Z, cancellationDueDate=2023-12-31T15:00:00.000Z)| startAt=24.01.03 KST', () => {
        // Given
        const tourId = 'VALID_TOUR_ID_KST';
        const userId = 'VALID_USER_ID';
        const startAt = '2024-01-03T00:00:00.000+09:00'; // 24.01.03 KST

        // When
        const tourReservation = sut.create(tourId, userId, startAt);

        // Then
        expect(tourReservation).toEqual({
          id: expect.any(String),
          tourId: 'VALID_TOUR_ID_KST',
          userId: 'VALID_USER_ID',
          startAt: new Date('2024-01-02T15:00:00.000Z'), // 24.01.03 KST
          cancellationDueDate: new Date('2023-12-31T15:00:00.000Z'), // 24.01.01 KST
          canceledAt: null,
          approvedAt: null,
        });
      });

      it('(startAt=2024-01-02T15:00:00.000Z, cancellationDueDate=2023-12-31T15:00:00.000Z)| startAt=24.01.03 12:34:56.789 KST', () => {
        // Given
        const tourId = 'VALID_TOUR_ID_HST';
        const userId = 'VALID_USER_ID';
        const startAt = '2024-01-03T12:34:56.789+09:00'; // 24.01.03 12:34:56 KST

        // When
        const tourReservation = sut.create(tourId, userId, startAt);

        // Then
        expect(tourReservation).toEqual({
          id: expect.any(String),
          tourId: 'VALID_TOUR_ID_HST',
          userId: 'VALID_USER_ID',
          startAt: new Date('2024-01-02T15:00:00.000Z'), //  24.01.03 KST
          cancellationDueDate: new Date('2023-12-31T15:00:00.000Z'), //  24.01.01 KST
          canceledAt: null,
          approvedAt: null,
        });
      });

      it('(startAt=2024-01-03T10:00:00.000Z, cancellationDueDate=2024-01-01T10:00:00.000Z)| startAt=24.01.03 HST', () => {
        // Given
        const tourId = 'VALID_TOUR_ID_KST';
        const userId = 'VALID_USER_ID';
        const startAt = '2024-01-03T00:00:00.000-10:00'; // 24.01.03 HST

        // When
        const tourReservation = sut.create(tourId, userId, startAt);

        // Then
        expect(tourReservation).toEqual({
          id: expect.any(String),
          tourId: 'VALID_TOUR_ID_KST',
          userId: 'VALID_USER_ID',
          startAt: new Date('2024-01-03T00:00:00.000-10:00'), // 24.01.03 HST
          cancellationDueDate: new Date('2024-01-01T00:00:00.000-10:00'), // 24.01.01 HST
          canceledAt: null,
          approvedAt: null,
        });
      });

      it('(startAt=2024-01-03T10:00:00.000Z, cancellationDueDate=2024-01-01T10:00:00.000Z)| startAt=24.01.03 12:34:56.789 HST', () => {
        // Given
        const tourId = 'VALID_TOUR_ID_HST';
        const userId = 'VALID_USER_ID';
        const startAt = '2024-01-03T12:34:56.789-10:00'; // 24.01.03 12:34:56 HST

        // When
        const tourReservation = sut.create(tourId, userId, startAt);

        // Then
        expect(tourReservation).toEqual({
          id: expect.any(String),
          tourId: 'VALID_TOUR_ID_HST',
          userId: 'VALID_USER_ID',
          startAt: new Date('2024-01-03T00:00:00.000-10:00'), // 24.01.03 HST
          cancellationDueDate: new Date('2024-01-01T00:00:00.000-10:00'), // 24.01.01 HST
          canceledAt: null,
          approvedAt: null,
        });
      });
    });
  });
});
