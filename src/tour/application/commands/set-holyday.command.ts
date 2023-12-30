export class SetHolydayCommand {
  constructor(
    public readonly tourId: string,
    public readonly holydays: string[],
  ) {}
}
