export class Tour {
  constructor(public readonly id: string) {}

  availableSchedules(year: number, month: number) {
    const lastDateOfMonth = new Date(year, month, 0).getDate();

    const availableSchedules = Array.from(
      { length: lastDateOfMonth },
      (_v, i) => i + 1,
    );

    return availableSchedules;
  }
}
