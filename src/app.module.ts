import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelModule } from './entities/hotel/hotel.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PriceOfferModule } from './entities/price-offer/price-offer.module';

@Module({
  imports: [
    HotelModule,
    SharedModule,
    PriceOfferModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
