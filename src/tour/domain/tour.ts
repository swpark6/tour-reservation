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
    ).filter((scheduleDay) => {
      const day = new Date(year, month - 1, scheduleDay).getDay();

      const isHolyday =
        this.holydaysOfWeek.some(
          (holydayOfWeek) => holydayOfWeek.value === day,
        ) ||
        this.holidays.some(
          (holyday) =>
            holyday.value ===
            `${year}-${month.toString().padStart(2, '0')}-${scheduleDay
              .toString()
              .padStart(2, '0')}`,
        );

      return !isHolyday;
    });

    return availableSchedules;
  }

  /**
   * 일단위 휴일적용
   * @param holidays
   */
  setHolydays(holidays: HolydayVo[]): void {
    this.holidays = holidays;
  }

  /**
   * 요일단위 휴일적용
   * @param holydayOfWeekVo
   */
  setHolydaysOfWeek(holydayOfWeekVo: HolydayOfWeekVo[]): void {
    this.holydaysOfWeek = holydayOfWeekVo;
  }
}
