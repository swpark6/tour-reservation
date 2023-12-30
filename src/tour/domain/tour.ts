import * as cronParser from 'cron-parser';
import { HolydayOfWeekVo } from './valud-object/holyday-of-week.vo';
import { HolydayVo } from './valud-object/holyday.vo';
export class Tour {
  holidays: HolydayVo[] = new Array<HolydayVo>();

  constructor(public readonly id: string) {}

  /**
   * 예약 가능 일정
   * @param year
   * @param month
   * @returns
   */
  availableSchedules(year: number, month: number) {
    const allDays = Math.pow(2, new Date(year, month, 0).getDate()) - 1;
    console.debug(allDays.toString(2));

    const holydayBitmask = this.holidays.reduce((acc, cur) => {
      const bitmask = this.getHolydayBitmask(cur, year, month);

      return acc | bitmask;
    }, 0);

    console.debug(holydayBitmask.toString(2));

    console.debug((allDays ^ holydayBitmask).toString(2));
    const availableSchedules = Array.from(
      (allDays ^ holydayBitmask).toString(2),
    )
      .map((day, index) => (day === '0' ? index + 1 : 0))
      .filter((day) => 0 < day);

    return availableSchedules;
  }

  /**
   * 휴일적용
   * @param holidays
   */
  setHolydays(holidays: HolydayVo[]): void {
    this.holidays = holidays;
  }

  private getHolydayBitmask(
    holyday: HolydayVo,
    year: number,
    month: number,
  ): number {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const interval = cronParser.parseExpression(holyday.value, {
      currentDate: startDate,
      endDate,
      iterator: true,
    });

    let bitmask = 0;
    for (let obj = interval.next(); !obj.done; obj = interval.next()) {
      const day = obj.value.toDate().getDate();
      bitmask |= 1 << (day - 1);
    }

    return bitmask;
  }
}
