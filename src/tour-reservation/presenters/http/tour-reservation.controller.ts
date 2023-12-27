import { Body, Controller, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateTourReservationCommand } from 'src/tour-reservation/application/commands/create-tour-reservation.command';
import { CreateTourReservationService } from 'src/tour-reservation/application/services/create-tour-reseravtion.service';
import { CreateTourReservationRequestDto } from './dto/create-tour-reservation.request.dto';
import { CreateTourReservationResponseDto } from './dto/create-tour-reservation.response.dto';

@Controller('tour-reservations')
export class TourReservationController {
  constructor(
    private readonly createTourReservationService: CreateTourReservationService,
  ) {}

  // TODO: add Swagger
  @Post()
  async create(
    @Body() dto: CreateTourReservationRequestDto,
  ): Promise<CreateTourReservationResponseDto> {
    const { tourId, userId } = dto;

    const tourReservation = await this.createTourReservationService.create(
      new CreateTourReservationCommand(tourId, userId),
    );

    return plainToInstance(CreateTourReservationResponseDto, tourReservation);
  }
}
