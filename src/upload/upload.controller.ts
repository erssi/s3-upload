import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ImageSize, UploadImageDto } from './dto/uploadImage.dto';
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
    @Body() body: UploadImageDto,
    @Param('filename') filename: string,
  ) {
    const headers = req.headers;

    if (headers['type'] != 'image') {
      return res.status(400).json({ error: 'Please upload an image' });
    }

    let size = [300, 300];
    if (body.size === ImageSize.LARGE) {
      size = [2048, 2048];
    }

    if (body.size === ImageSize.MEDIUM) {
      size = [1024, 1024];
    }

    const buffer = await sharp(body?.path).resize(size[0], size[1]).toBuffer();

    await this.uploadService.uploadedImage(buffer, filename);

    return res.status(200).json({ message: 'Image uploaded successfully' });
  }
}
