const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const config = require('../../utils/config');

class StorageService {
  constructor() {
    const provider = config.s3.provider || 'aws';

    if (provider === 'minio') {
      // === MinIO Client ===
      this._S3 = new S3Client({
        region: 'us-east-1',
        endpoint: config.s3.host,
        credentials: {
          accessKeyId: config.s3.accessKeyId,
          secretAccessKey: config.s3.secretAccessKey,
        },
        forcePathStyle: true,
      });
      this._bucket = config.s3.bucketName;
    } else {
      // === AWS Client ===
      this._S3 = new S3Client({
        region: config.s3.region,
        credentials: {
          accessKeyId: config.s3.accessKeyId,
          secretAccessKey: config.s3.secretAccessKey,
        },
      });
      this._bucket = config.s3.bucketName;
    }

    this._provider = provider;
  }

  async writeFile(file, meta) {
    const key = meta.filename;

    const command = new PutObjectCommand({
      Bucket: this._bucket,
      Key: key,
      Body: file._data,
      ContentType: meta.headers['content-type'],
    });

    await this._S3.send(command);

    return this.createPreSignedUrl({ bucket: this._bucket, key });
  }

  createPreSignedUrl({ bucket, key }) {
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    return getSignedUrl(this._S3, command, { expiresIn: 3600 });
  }
}

module.exports = StorageService;
