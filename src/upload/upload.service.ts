import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

require('dotenv').config();
@Injectable()
export class UploadService {
  async uploadedImage(buffer: Buffer, filename: string, type: string) {
    const s3 = new AWS.S3({
      accessKeyId: String(process.env.AWS_S3_ACCESS_KEY_ID),
      secretAccessKey: String(process.env.AWS_S3_SECRET_ACCESS_KEY),
      region: String(process.env.AWS_S3_REGION),
    });

    return await s3
      .upload({
        Bucket: String(process.env.AWS_S3_BUCKET_NAME),
        Key: uuidv4() + filename + '.' + type,
        Body: buffer,
      })
      .promise();
  }
}
