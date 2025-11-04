import { ApiResponse } from '@nestjs/swagger';
import {
  UploadResponseSchema,
  UploadErrorResponseSchema,
} from './uploads.schemas';

export const UploadSuccessResponse = [
  ApiResponse({
    status: 201,
    description:
      'Image uploaded successfully with optimization and CDN delivery',
    schema: UploadResponseSchema,
  }),
];

export const UploadErrorResponses = [
  ApiResponse({
    status: 400,
    description:
      'Bad Request - Invalid file format, missing file, or validation errors (Supported formats: JPG, PNG, GIF, WebP | Max size: 5MB | Dimensions: 100x100 to 4096x4096)',
    schema: UploadErrorResponseSchema,
  }),
  ApiResponse({
    status: 413,
    description:
      'Payload Too Large - File size exceeds maximum allowed limit of 5MB',
    schema: UploadErrorResponseSchema,
  }),
  ApiResponse({
    status: 415,
    description:
      'Unsupported Media Type - File format not supported (Only JPG, PNG, GIF, WebP allowed)',
    schema: UploadErrorResponseSchema,
  }),
  ApiResponse({
    status: 422,
    description:
      'Unprocessable Entity - Image processing failed or corrupted file',
    schema: UploadErrorResponseSchema,
  }),
  ApiResponse({
    status: 500,
    description:
      'Internal Server Error - Upload processing or storage service failure',
    schema: UploadErrorResponseSchema,
  }),
];

export const UploadResponses = [
  ...UploadSuccessResponse,
  ...UploadErrorResponses,
];
