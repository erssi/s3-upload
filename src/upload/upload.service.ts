import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

require('dotenv').config();
@Injectable()
export class UploadService {
  async uploadedImage(buffer: Buffer, filename: string) {
    const s3 = new AWS.S3({
      accessKeyId: String(process.env.AWS_S3_ACCESS_KEY_ID),
      secretAccessKey: String(process.env.AWS_S3_SECRET_ACCESS_KEY),
      region: 'us-east-1',
    });

    return await s3
      .upload({
        Bucket: String(process.env.AWS_S3_BUCKET_NAME),
        Key: filename,
        Body: buffer,
      })
      .promise();
  }
}
