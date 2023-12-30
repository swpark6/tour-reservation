import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TourReservationModule } from './tour-reservation/tour-reservation.module';
import { CqrsModule } from '@nestjs/cqrs';

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
    CqrsModule.forRoot(),
    TourReservationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
