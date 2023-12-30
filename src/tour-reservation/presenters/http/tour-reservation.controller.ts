import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { CreateTourReservationCommand } from 'src/tour-reservation/application/commands/create-tour-reservation.command';
import { CreateTourReservationService } from 'src/tour-reservation/application/services/create-tour-reseravtion.service';
import { CreateTourReservationRequestDto } from './dto/create-tour-reservation.request.dto';
import { CreateTourReservationResponseDto } from './dto/create-tour-reservation.response.dto';

@ApiTags('tour-reservations')
@Controller('tour-reservations')
export class TourReservationController {
  constructor(
    private readonly createTourReservationService: CreateTourReservationService,
  ) {}

  @ApiCreatedResponse({ type: CreateTourReservationResponseDto })
  @ApiOperation({
    operationId: 'create-tour-reservations',
    summary: '투어 예약 신청',
  })
  @Post()
  async create(
    @Body() dto: CreateTourReservationRequestDto,
  ): Promise<CreateTourReservationResponseDto> {
    const { tourId, userId, startAt } = dto;

    const tourReservation = await this.createTourReservationService.create(
      new CreateTourReservationCommand(tourId, userId, startAt),
    );

    return plainToInstance(CreateTourReservationResponseDto, tourReservation);
  }
}
