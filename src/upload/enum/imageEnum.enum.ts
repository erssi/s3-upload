import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum ImageType {
  JPEG = 'jpeg',
  PNG = 'png',
}

export enum ImageSize {
  LARGE = 'large',
  MEDIUM = 'medium',
  THUMBNAIL = 'thumbnail',
}
