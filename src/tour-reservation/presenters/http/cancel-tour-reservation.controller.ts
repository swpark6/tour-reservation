import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CancelTourReservationCommand } from 'src/tour-reservation/application/commands/cancel-tour-reservation.command';
import { CancelTourReservationService } from 'src/tour-reservation/application/services/cancel-tour-reservation.service';
import { CreateTourReservationResponseDto } from './dto/create-tour-reservation.response.dto';

@ApiTags('tour-reservations')
@Controller('tour-reservations')
export class CancelTourReservationController {
  constructor(
    private readonly cancelTourReservationService: CancelTourReservationService,
  ) {}

  @ApiCreatedResponse({ type: CreateTourReservationResponseDto })
  @ApiNotFoundResponse({ description: '투어 예약이 존재하지 않은 경우' })
  @ApiConflictResponse({ description: '취소 마감일이 지난 경우' })
  @ApiOperation({
    operationId: 'cancel-tour-reservations',
    summary: '투어 예약 취소',
  })
  @HttpCode(HttpStatus.OK)
  @Delete('/:tourReservationId')
  async create(
    @Param('tourReservationId') tourReservationId: string,
  ): Promise<void> {
    await this.cancelTourReservationService.cancel(
      new CancelTourReservationCommand(tourReservationId, new Date()),
    );
  }
}
