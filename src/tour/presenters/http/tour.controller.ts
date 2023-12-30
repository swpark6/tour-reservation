import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetTourQuery } from 'src/tour/application/queries/get-tour.query';
import { GetTourService } from 'src/tour/application/services/get-tour.service';
import { Tour } from 'src/tour/domain/tour';

@ApiTags('tours')
@Controller('tours')
export class GetTourController {
  constructor(private readonly getTourService: GetTourService) {}

  @ApiOkResponse({ type: Tour })
  @ApiNotFoundResponse({ description: '투어가 존재하지 않은 경우' })
  @ApiOperation({ operationId: 'get-tour', summary: '투어 조회(휴일조회)' })
  @Get('/:tourId')
  findOne(@Param('tourId') tourId: string) {
    return this.getTourService.findOne(new GetTourQuery(tourId));
  }
}
