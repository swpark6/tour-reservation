import { Body, Controller, Param, Patch, ValidationPipe } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SetHolydayCommand } from 'src/tour/application/commands/set-holyday.command';
import { SetHolydaysService } from 'src/tour/application/services/set-holydays.service';
import { Tour } from 'src/tour/domain/tour';
import { SetHolydaysRequestDto } from './dto/set-holydays.request.dto';

@ApiTags('tours')
@Controller('tours')
export class SetHolydaysController {
  constructor(private readonly setHolydaysService: SetHolydaysService) {}

  @ApiOkResponse({ type: Tour })
  @ApiNotFoundResponse({ description: '투어가 존재하지 않은 경우' })
  @ApiOperation({ operationId: 'set-holydays', summary: '휴일 지정' })
  @Patch(':tourId/holydays')
  setHolyday(
    @Param('tourId') tourId: string,
    @Body(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    dto: SetHolydaysRequestDto,
  ): Promise<Tour> {
    const { holydays } = dto;

    return this.setHolydaysService.setHolyday(
      new SetHolydayCommand(tourId, holydays),
    );
  }
}
