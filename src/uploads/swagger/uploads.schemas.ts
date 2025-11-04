import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const UploadRequestSchema: SchemaObject = {
  type: 'object',
  properties: {
    file: {
      type: 'string',
      format: 'binary',
      description:
        'Image file to upload with supported formats and size limits',
      example: 'image-file.jpg',
    },
  },
  required: ['file'],
  additionalProperties: false,
};

export const UploadResponseSchema: SchemaObject = {
  type: 'object',
  properties: {
    url: {
      type: 'string',
      format: 'uri',
      description:
        'Secure public URL of the uploaded image with CDN optimization',
      example:
        'https://res.cloudinary.com/demo/image/upload/v1234567890/sample.jpg',
    },
    publicId: {
      type: 'string',
      description:
        'Unique Cloudinary public identifier for image management operations',
      example: 'uploads/profile_images/user_abc123_photo',
      pattern: '^[a-zA-Z0-9_/-]+$',
    },
    uploadedAt: {
      type: 'string',
      format: 'date-time',
      description: 'Timestamp when the image was successfully uploaded',
      example: '2024-01-15T10:30:00.000Z',
    },
    metadata: {
      type: 'object',
      description: 'Additional image metadata and optimization information',
      properties: {
        width: {
          type: 'number',
          description: 'Original image width in pixels',
          example: 1920,
        },
        height: {
          type: 'number',
          description: 'Original image height in pixels',
          example: 1080,
        },
        format: {
          type: 'string',
          description: 'Image format after processing',
          example: 'jpg',
          enum: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        },
        size: {
          type: 'number',
          description: 'File size in bytes after optimization',
          example: 245760,
        },
      },
    },
  },
  required: ['url', 'publicId'],
  additionalProperties: false,
};

export const UploadErrorResponseSchema: SchemaObject = {
  type: 'object',
  properties: {
    statusCode: {
      type: 'number',
      description: 'HTTP status code indicating the type of error',
      example: 400,
    },
    message: {
      oneOf: [
        {
          type: 'string',
          description: 'Single error message',
          example:
            'File format not supported. Please upload JPG, PNG, or GIF files.',
        },
        {
          type: 'array',
          items: { type: 'string' },
          description: 'Multiple validation error messages',
          example: [
            'File size exceeds maximum limit of 5MB',
            'File format not supported',
          ],
        },
      ],
    },
    error: {
      type: 'string',
      description: 'Error category for programmatic handling',
      example: 'Bad Request',
    },
    details: {
      type: 'object',
      description: 'Additional error context and troubleshooting information',
      properties: {
        acceptedFormats: {
          type: 'array',
          items: { type: 'string' },
          description: 'List of supported file formats',
          example: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        },
        maxFileSize: {
          type: 'string',
          description: 'Maximum allowed file size',
          example: '5MB',
        },
        uploadGuidelines: {
          type: 'string',
          description: 'Best practices for successful uploads',
          example:
            'Use high-quality images with good lighting for better results',
        },
      },
    },
  },
  required: ['statusCode', 'message', 'error'],
  additionalProperties: false,
};

export const UploadValidationSchema: SchemaObject = {
  type: 'object',
  properties: {
    supportedFormats: {
      type: 'array',
      items: { type: 'string' },
      description: 'Supported image formats for upload',
      example: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    },
    maxFileSize: {
      type: 'number',
      description: 'Maximum file size in bytes',
      example: 5242880,
    },
    minDimensions: {
      type: 'object',
      properties: {
        width: { type: 'number', example: 100 },
        height: { type: 'number', example: 100 },
      },
    },
    maxDimensions: {
      type: 'object',
      properties: {
        width: { type: 'number', example: 4096 },
        height: { type: 'number', example: 4096 },
      },
    },
  },
};
