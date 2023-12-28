export class CreateTourReservationCommand {
  constructor(
    public readonly tourId: string,
    public readonly userId: string,
    public readonly startAt: Date,
  ) {}
}
