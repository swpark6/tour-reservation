export class GetAvailableSchedulesQuery {
  constructor(
    public readonly tourId: string,
    public readonly year: number,
    public readonly month: number,
  ) {}
}
