import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ImageSize, ImageType } from './enum/imageEnum.enum';
import { UploadService } from './upload.service';
import { Request, Response } from 'express';
import * as sharp from 'sharp';

@Controller('upload')
export class UploadController {
  @Inject(UploadService)
  public uploadService: UploadService;

  @Get('/:filename')
  async upload(
    @Req() req: Request,
    @Res() res: Response,
    @Param('filename') filename: string,
    @Query('size') size: string,
  ) {
    const headers = req.headers;
    let buffer = req.read();
    const type = headers['content-type']?.split('/');

    if (type[0] != 'image') {
      return res.status(400).json({ error: 'Please upload an image' });
    }

    if (type[1] != (ImageType.JPEG || ImageType.PNG)) {
      return res.status(400).json({ error: 'Please upload a jpeg or png' });
    }

    if (!size) {
      return res.status(400).json({ error: 'Please select image size' });
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

    const a = await this.uploadService.uploadedImage(buffer, filename, type[1]);
    console.log(a);

    return res.status(200).json({ message: 'Image uploaded successfully' });
  }
}
