import { CanNotCancelException } from './exceptions/can-not-cancel.exception';

export class TourReservation {
  public constructor(
    public readonly id: string,
    // 투어
    public readonly tourId: string,

    // 사용자
    public readonly userId: string,

    // 여행 시작일
    public readonly startAt: Date,

    // 취소 마감일
    public readonly cancellationDueDate: Date,

    // 취소일
    public canceledAt: Date | null,

    // 승인일
    public approvedAt: Date | null,
  ) {}

  /**
   * 예약 승인
   */
  approve(now: Date) {
    // 이미 승인된 경우
    if (this.approvedAt) {
      return;
    }

    this.approvedAt = now;
  }

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
