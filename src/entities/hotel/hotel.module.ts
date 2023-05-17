import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';

@Module({
  providers: [],
  imports: [SharedModule],
})
export class HotelModule {}
