export class Hotel {
  code: string;
  info: HotelInfo;
}

export class HotelInfo {
  name: string;
  mainImage: string;
  images: string[];
  address?: string;
  position: Position;
  rating: number;
  roomInfo: RoomInfo;
}

export class Position {
  longitude: string;
  latitude: string;
  distances: DistancesFromPoints[];
}

export class DistancesFromPoints {
  distance: string;
  unit: UnitType;
  pointType: PointTypeEnum;
}

export class RoomInfo {
  beds: number;
  sizeInMeters?: number;
}

export enum PointTypeEnum {
  CITY_CENTER,
  SKI_LIFT,
  SPA,
  OTHER
}

export enum UnitType {
  METER = 'meter',
  FEET = 'feet',
  KM = 'km',
}
