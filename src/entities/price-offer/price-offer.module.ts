import { Module } from '@nestjs/common';
import { PriceOfferController } from './price-offer.controller';
import { SharedModule } from '../../shared/shared.module';

@Module({
  providers: [PriceOfferController],
  imports: [SharedModule],
  controllers: [PriceOfferController]
})
export class PriceOfferModule {}
