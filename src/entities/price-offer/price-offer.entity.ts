import { Hotel } from '../hotel/hotel.entity';

export class PriceOffer {
  hotel: Hotel;
  startDate: Date;
  endDate: Date;
  priceInfo: PriceInfo;
}

export class PriceInfo {
  amountBeforeTax: number;
  amountAfterTax: number;
  currency?: string;
}
