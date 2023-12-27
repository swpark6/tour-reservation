import { randomUUID } from 'crypto';

export class TourReservation {
  private constructor(
    private readonly id: string,

    // 투어
    private readonly tourId: string,

    // 사용자
    private readonly userId: string,
  ) {}

  /**
   * 신규 투어 예약
   * @param tourId
   * @param userId
   * @returns
   */
  static create(tourId: string, userId: string): TourReservation {
    const id = randomUUID();

    const tourReservation = new TourReservation(id, tourId, userId);

    return tourReservation;
  }
}
