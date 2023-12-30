import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { GetAvailableSchedulesQuery } from 'src/tour/application/queries/get-available-schedules.query';
import { GetAvailableSchedulesService } from 'src/tour/application/services/get-available-schedules.service';
import { GetAvailableSchedulesRequestDto } from './dto/get-available-schedules.request.dto';
import { GetAvailableSchedulesResponseDto } from './dto/get-available-schedules.response.dto';

@ApiTags('tours')
@Controller('tours')
export class GetAvailableSchedulesController {
  constructor(
    private readonly getAvailableSchedulesService: GetAvailableSchedulesService,
  ) {}

  @ApiOkResponse({ type: GetAvailableSchedulesResponseDto })
  @ApiNotFoundResponse({ description: '투어가 존재하지 않은 경우' })
  @ApiOperation({
    operationId: 'available-schedules',
    summary: '예약 가능 일정 조회',
  })
  @Get(':tourId/available-schedules')
  async getAvailableSchedules(
    @Param('tourId') tourId: string,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    query: GetAvailableSchedulesRequestDto,
  ): Promise<GetAvailableSchedulesResponseDto> {
    const { year, month } = query;

    const availableSchedules =
      await this.getAvailableSchedulesService.getAvailableSchedules(
        new GetAvailableSchedulesQuery(tourId, year, month),
      );

    return plainToInstance(GetAvailableSchedulesResponseDto, {
      availableSchedules,
    });
  }
}
