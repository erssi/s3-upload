import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ImageSize } from './enum/imageEnum.enum';
import { UploadService } from './upload.service';
import { Request, Response } from 'express';
import * as sharp from 'sharp';

@Controller('upload')
export class UploadController {
  @Inject(UploadService)
  public uploadService: UploadService;

  @Post('/:filename')
  async upload(
    @Req() req: Request,
    @Res() res: Response,
    @Param('filename') filename: string,
    @Query('size') size: ImageSize,
  ) {
    const headers = req.headers;
    let buffer = req.read();

    if (headers['content-type']?.split('/')[0] != 'image') {
      return res.status(400).json({ error: 'Please upload an image' });
    }

    let dimensions = [300, 300];
    if (size === ImageSize.LARGE) {
      dimensions = [2048, 2048];
    }

    if (size === ImageSize.MEDIUM) {
      dimensions = [1024, 1024];
    }

    buffer = await sharp(buffer)
      .resize(dimensions[0], dimensions[1])
      .toBuffer();

    await this.uploadService.uploadedImage(buffer, filename);

    return res.status(200).json({ message: 'Image uploaded successfully' });
  }
}
