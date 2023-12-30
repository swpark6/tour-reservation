import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TourReservationModule } from './tour-reservation/tour-reservation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      password: 'root',
      username: 'root',
      database: 'local',
      autoLoadEntities: true,
      synchronize: false,
      timezone: 'Z',
    }),
    TourReservationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
