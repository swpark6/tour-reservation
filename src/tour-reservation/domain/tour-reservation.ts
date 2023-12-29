import { CanNotCancelException } from './exceptions/can-not-cancel.exception';

export class TourReservation {
  // 투어
  tourId: string;

  // 사용자
  userId: string;

  // 여행 시작일
  startAt: Date;

  // 취소 마감일
  cancellationDueDate: Date;

  // 취소일
  canceledAt: Date | null;

  public constructor(public id: string) {}

  /**
   * 예약 취소
   * @param now
   * @throws CanNotCancelException
   */
  cancel(now: Date): void {
    // 이미 취소가 된 경우
    if (this.canceledAt) {
      return;
    }

    if (!this.isCancelable(now)) {
      throw new CanNotCancelException(now, this.cancellationDueDate);
    }

    this.canceledAt = now;
  }

  /**
   * 취소 가능 여부
   * @param now
   * @returns
   */
  private isCancelable(now: Date): boolean {
    return now < this.cancellationDueDate;
  }
}
