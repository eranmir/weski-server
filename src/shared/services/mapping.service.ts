import { Injectable } from '@nestjs/common';
import { PointTypeEnum, UnitType } from '../../entities/hotel/hotel.entity';
import { MockApiHotelsDto } from './hotels-api.service';
import { PriceOffer } from '../../entities/price-offer/price-offer.entity';

@Injectable()
export class MappingService {
  mapModelFromHotelsMockApi(
    hotelsMockApiResponse: MockApiHotelsDto,
    startDate: Date,
    endDate: Date,
  ): PriceOffer[] {
    const priceOffers: PriceOffer[] = [];
    hotelsMockApiResponse.accommodations.forEach((accommodation) => {
      priceOffers.push({
        hotel: {
          code: accommodation.HotelCode,
          info: {
            name: accommodation.HotelName,
            images: accommodation.HotelDescriptiveContent.Images.map(
              (image) => image.URL,
            ),
            mainImage: accommodation.HotelDescriptiveContent.Images.find(
              (image) => image.MainImage === 'True',
            ).URL,
            rating: parseInt(accommodation.HotelInfo.Rating, 10),
            roomInfo: {
              beds: parseInt(accommodation.HotelInfo.Beds, 10),
            },
            position: {
              longitude: accommodation.HotelInfo.Position.Longitude,
              latitude: accommodation.HotelInfo.Position.Latitude,
              distances: accommodation.HotelInfo.Position.Distances.map(
                (distance) => {
                  return {
                    distance: distance.distance,
                    unit: UnitType.METER,
                    pointType:
                      distance.type === 'ski_lift'
                        ? PointTypeEnum.SKI_LIFT
                        : distance.type === 'city_center'
                        ? PointTypeEnum.CITY_CENTER
                        : PointTypeEnum.OTHER,
                  };
                },
              ),
            },
          },
        },
        startDate,
        endDate,
        priceInfo: {
          amountBeforeTax: parseFloat(accommodation.PricesInfo.AmountBeforeTax),
          amountAfterTax: parseFloat(accommodation.PricesInfo.AmountAfterTax),
        },
      });
    });
    return priceOffers;
  }
}
