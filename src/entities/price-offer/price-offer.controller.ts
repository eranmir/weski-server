import { Body, Controller, Post } from '@nestjs/common';
import { HotelsApiService } from '../../shared/services/hotels-api.service';
import { PriceOffer } from './price-offer.entity';

@Controller('priceOffer')
export class PriceOfferController {
  constructor(private hotelsApiService: HotelsApiService) {}

  @Post('getPriceOffers')
  getPriceOffers(
    @Body()
    {
      fromDate,
      toDate,
      groupSize,
      skiSite,
    }: {
      fromDate: Date;
      toDate: Date;
      groupSize: number;
      skiSite: number;
    },
  ): Promise<PriceOffer[]> {
    return this.hotelsApiService.getHotelsFromMockApi(
      skiSite,
      fromDate,
      toDate,
      groupSize,
    );
  }
}
