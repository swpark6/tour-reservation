import { HolydayOfWeekVo } from './value-object/holyday-of-week.vo';
import { HolydayVo } from './value-object/holyday.vo';

export class Tour {
  holidays: HolydayVo[] = new Array<HolydayVo>();
  holydaysOfWeek: HolydayOfWeekVo[] = new Array<HolydayOfWeekVo>();

  constructor(public readonly id: string) {}

  /**
   * 예약 가능 일정
   * @param year
   * @param month
   * @returns
   */
  availableSchedules(year: number, month: number) {
    const lastDateOfMonth = new Date(year, month, 0).getDate();

    const availableSchedules = Array.from(
      { length: lastDateOfMonth },
      (_v, i) => i + 1,
    );

    return availableSchedules;
  }

  /**
   * 휴일적용
   * @param holidays
   */
  setHolydays(holidays: HolydayVo[]): void {
    this.holidays = holidays;
  }
}
