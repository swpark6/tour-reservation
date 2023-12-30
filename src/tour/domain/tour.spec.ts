import { Tour } from './tour';

describe('Tour spec', () => {
  describe('getAvailableSchedules()', () => {
    it('return available dates', () => {
      // Given
      const sut = new Tour('VALID_TOUR_ID');
      const year = 2023;
      const month = 12;

      // When
      const result = sut.availableSchedules(year, month);

      // Then
      expect(result).toEqual([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ]);
    });

    it('return available dates', () => {
      const sut = new Tour('VALID_TOUR_ID');

      // Given
      const year = 2024;
      const month = 2;

      // When
      const result = sut.availableSchedules(year, month);

      // Then
      expect(result).toEqual([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29,
      ]);
    });
  });
});
