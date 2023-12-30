import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetTourReservationQuery } from 'src/tour-reservation/application/queries/get-tour-reservation.query';
import { GetTourReservationService } from 'src/tour-reservation/application/services/get-tour-reservation.service';
import { TourReservation } from 'src/tour-reservation/domain/tour-reservation';

@ApiTags('tour-reservations')
@Controller('tour-reservations')
export class GetTourReservationController {
  constructor(
    private readonly getTourReservationService: GetTourReservationService,
  ) {}

  @ApiOkResponse({ type: TourReservation })
  @ApiNotFoundResponse({ description: '투어예약이 없는 경우' })
  @ApiOperation({
    operationId: 'get-tour-reservation',
    summary: '고객 예약 여부 확인',
  })
  @Get('/:tourReservationId')
  findOne(@Param('tourReservationId') tourReservationId: string) {
    return this.getTourReservationService.findOne(
      new GetTourReservationQuery(tourReservationId),
    );
  }
}
