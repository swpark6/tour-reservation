import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TourReservationModule } from './tour-reservation/tour-reservation.module';

@Module({
  imports: [TourReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
