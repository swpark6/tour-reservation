import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApproveTourReservationCommand } from 'src/tour-reservation/application/commands/approve-tour-reservation.command';
import { ApproveTourReservationService } from 'src/tour-reservation/application/services/approve-tour-reservation.service';
import { ApproveTourReservationRequestDto } from './dto/approve-tour-reservation.request.dto';

@ApiTags('tour-reservations')
@Controller('tour-reservations')
export class ApproveTourReservationController {
  constructor(
    private readonly approveTourReservationService: ApproveTourReservationService,
  ) {}

  @ApiNotFoundResponse({ description: '예약내역이 없는 경우' })
  @ApiConflictResponse({ description: '이미 취소된 예약인 경우' })
  @ApiOperation({
    operationId: 'approve-tour-reservation',
    summary: '투어 예약 승인',
  })
  @HttpCode(HttpStatus.OK)
  @Post('/:tourReservationId/approve')
  async approveTourReservation(
    @Body() dto: ApproveTourReservationRequestDto,
  ): Promise<void> {
    const { tourReservationId } = dto;

    await this.approveTourReservationService.approve(
      new ApproveTourReservationCommand(tourReservationId),
    );
  }
}
