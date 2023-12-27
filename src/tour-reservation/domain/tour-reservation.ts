export class TourReservation {
  public constructor(
    public id: string,

    // 투어
    public tourId: string,

    // 사용자
    public userId: string,
  ) {}
}
