import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HotelsApiService } from './services/hotels-api.service';
import { MappingService } from './services/mapping.service';

@Module({
  providers: [HotelsApiService, MappingService],
  imports: [HttpModule],
  exports: [MappingService, HotelsApiService],
  controllers: [],
})
export class SharedModule {}
