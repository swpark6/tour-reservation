export class CancelTourReservationCommand {
  constructor(
    public readonly tourReservationId: string,
    public readonly now: Date,
  ) {}
}
