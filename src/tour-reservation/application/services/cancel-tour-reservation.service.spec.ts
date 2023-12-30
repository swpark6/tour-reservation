import { Test } from '@nestjs/testing';

import { NotFoundException } from '@nestjs/common';
import { fail } from 'assert';
import { CanNotCancelException } from '../../domain/exceptions/can-not-cancel.exception';
import { TourReservationFactory } from '../../domain/factories/tour-reservation.factory';
import { CancelTourReservationCommand } from '../commands/cancel-tour-reservation.command';
import { TourReservationRepositoryPort } from '../ports/tour-reservation.repository.port';
import { CancelTourReservationService } from './cancel-tour-reservation.service';

type Mock<T> = Partial<Record<keyof T, jest.Mock>>;

const createTourReservationRepositoryMock =
  (): Mock<TourReservationRepositoryPort> => ({
    findOneById: jest.fn(),
    save: jest.fn(),
  });

describe('CancelTourReservationService Spec', () => {
  let sut: CancelTourReservationService;

  // Mock
  let tourReservationRepository: Mock<TourReservationRepositoryPort>;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      providers: [
        CancelTourReservationService,
        {
          provide: TourReservationRepositoryPort,
          useValue: createTourReservationRepositoryMock(),
        },
      ],
    }).compile();

    sut = moduleFixture.get(CancelTourReservationService);

    tourReservationRepository = moduleFixture.get(
      TourReservationRepositoryPort,
    );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('cancel()', () => {
    it('cancel tour reservation', async () => {
      // Given
      const factory = new TourReservationFactory();
      const tourReservation = factory.create(
        'VALID_TOUR_RESERVATION_ID',
        'VALID_USER_ID',
        '2024-01-03T00:00:00.000-10:00',
      );

      tourReservationRepository.findOneById.mockResolvedValue(tourReservation);

      // When
      await sut.cancel(
        new CancelTourReservationCommand(
          'VALID_TOUR_RESERVATION_ID',
          new Date('2023-12-31T23:59:59.999-10:00'),
        ),
      );

      // Then
      expect(tourReservationRepository.save).toHaveBeenCalledTimes(1);
      expect(tourReservationRepository.save).toHaveBeenCalledWith({
        id: expect.any(String),
        tourId: 'VALID_TOUR_RESERVATION_ID',
        userId: 'VALID_USER_ID',
        startAt: new Date('2024-01-03T10:00:00.000Z'),
        cancellationDueDate: new Date('2024-01-01T10:00:00.000Z'),
        canceledAt: new Date('2024-01-01T09:59:59.999Z'),
        approvedAt: null,
      });
    });

    it('throw CanNotCancelException ', async () => {
      // Given
      const factory = new TourReservationFactory();
      const tourReservation = factory.create(
        'VALID_TOUR_RESERVATION_ID',
        'VALID_USER_ID',
        '2024-01-03T00:00:00.000-10:00',
      );

      tourReservationRepository.findOneById.mockResolvedValue(tourReservation);

      try {
        // When
        await sut.cancel(
          new CancelTourReservationCommand(
            'VALID_TOUR_RESERVATION_ID',
            new Date('2024-01-01T00:00:00.000-10:00'),
          ),
        );
        fail();
      } catch (e) {
        // Then
        expect(e).toBeInstanceOf(CanNotCancelException);
        expect(tourReservationRepository.save).toHaveBeenCalledTimes(0);
      }
    });

    it('throw NotFoundException ', async () => {
      // Given
      tourReservationRepository.findOneById.mockResolvedValue(null);

      try {
        // When
        await sut.cancel(
          new CancelTourReservationCommand(
            'VALID_TOUR_RESERVATION_ID',
            new Date('2024-01-01T00:00:00.000-10:00'),
          ),
        );
        fail();
      } catch (e) {
        // Then
        expect(e).toBeInstanceOf(NotFoundException);
        expect(tourReservationRepository.save).toHaveBeenCalledTimes(0);
      }
    });
  });
});
