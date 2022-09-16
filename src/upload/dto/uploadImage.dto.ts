import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum ImageType {
  JPEG = 'jpeg',
  PNG = 'png',
}

export enum ImageSize {
  LARGE = 'large',
  MEDIUM = 'medium',
  THUMBNAIL = 'thumbnail',
}

export class UploadImageDto {
  @IsNotEmpty()
  @IsString()
  path: string;

  @IsNotEmpty()
  @IsEnum(ImageSize)
  size: ImageSize;
}
