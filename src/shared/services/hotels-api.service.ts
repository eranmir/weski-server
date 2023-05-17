import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { MappingService } from './mapping.service';

@Injectable()
export class HotelsApiService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private mappingService: MappingService,
  ) {}

  async getHotelsFromMockApi(
    skiSite: number,
    fromDate: Date,
    toDate: Date,
    groupSize: number,
  ) {
    try {
      const promiseArray: Promise<any>[] = [];

      for (
        let currGroupSize = groupSize;
        currGroupSize < this.configService.get<number>('max_group_size');
        currGroupSize++
      )
        promiseArray.push(
          lastValueFrom(
            this.httpService.post(
              this.configService.get<string>('hotels_api.url'),
              {
                query: {
                  ski_site: skiSite,
                  from_date: new Date(fromDate).toISOString().split('T')[0],
                  to_date: new Date(toDate).toISOString().split('T')[0],
                  group_size: currGroupSize,
                },
              },
            ),
          ),
        );

      const allAPIResults = await Promise.all(promiseArray);
      let allHotelResults = [];
      allAPIResults.forEach((result) => {
        if (
          result.status !== HttpStatus.OK ||
          !result?.data?.body?.accommodations ||
          result?.data.body.success !== 'true'
        ) {
          throw new Error('Error getting hotels from api');
        }
        allHotelResults = allHotelResults.concat(
          result.data.body.accommodations,
        );
      });

      return this.mappingService.mapModelFromHotelsMockApi(
        {
          accommodations: allHotelResults,
        } as MockApiHotelsDto,
        fromDate,
        toDate,
      ).sort((first, second) => first.priceInfo.amountAfterTax - second.priceInfo.amountAfterTax);
    } catch (error) {
      console.error(error);
    }
  }
}

export class MockApiHotelsDto {
  accommodations: {
    HotelCode: string;
    HotelName: string;
    HotelDescriptiveContent: { Images: { URL: string; MainImage: string }[] };
    HotelInfo: {
      Position: {
        Latitude: string;
        Longitude: string;
        Distances: {
          type: string;
          distance: string;
        }[];
      };
      Rating: string;
      Beds: string;
    };
    PricesInfo: {
      AmountAfterTax: string;
      AmountBeforeTax: string;
    };
  }[];
}
