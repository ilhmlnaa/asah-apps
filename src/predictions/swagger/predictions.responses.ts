import { ApiResponse } from '@nestjs/swagger';
import {
  PredictionsListResponseSchema,
  PredictionWithCustomerSchema,
  DeletePredictionResponseSchema,
} from './predictions.schemas';

export const PredictionsListResponse = [
  ApiResponse({
    status: 200,
    description: 'Predictions list retrieved successfully',
    schema: PredictionsListResponseSchema,
  }),
  ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid query parameters',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Validation failed: minScore must be between 0 and 1',
        },
        statusCode: { type: 'number', example: 400 },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  }),
  ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Unauthorized access - invalid token',
        },
        statusCode: { type: 'number', example: 401 },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
  }),
];

/**
 * Single Prediction Detail Response Documentation
 */
export const PredictionDetailResponse = [
  ApiResponse({
    status: 200,
    description: 'Prediction details retrieved successfully',
    schema: PredictionWithCustomerSchema,
  }),
  ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Unauthorized access - invalid token',
        },
        statusCode: { type: 'number', example: 401 },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
  }),
  ApiResponse({
    status: 404,
    description: 'Not Found - Prediction not found',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Prediction with ID clp123abc456def789ghi012 not found',
        },
        statusCode: { type: 'number', example: 404 },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  }),
];

/**
 * Update Prediction Response Documentation
 */
export const UpdatePredictionResponse = [
  ApiResponse({
    status: 200,
    description: 'Prediction updated successfully',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Prediction identifier',
          example: 'clp123abc456def789ghi012',
        },
        customerId: {
          type: 'string',
          description: 'Associated customer ID',
          example: 'clm123abc456def789ghi012',
        },
        score: {
          type: 'number',
          description: 'Prediction score (unchanged)',
          example: 0.85,
        },
        confidence: {
          type: 'number',
          description: 'Model confidence (unchanged)',
          example: 0.92,
        },
        notes: {
          type: 'string',
          description: 'Updated notes',
          example: 'Customer showed high engagement, prediction validated',
        },
        validated: {
          type: 'boolean',
          description: 'Validation status',
          example: true,
        },
        actualOutcome: {
          type: 'string',
          enum: ['CONVERTED', 'NOT_CONVERTED'],
          description: 'Actual conversion outcome',
          example: 'CONVERTED',
        },
        validatedBy: {
          type: 'string',
          description: 'Validator identifier',
          example: 'admin@example.com',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          description: 'Update timestamp',
          example: '2024-01-15T16:30:00.000Z',
        },
      },
      required: ['id', 'customerId', 'score', 'confidence', 'updatedAt'],
    },
  }),
  ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example:
            'Validation failed: actualOutcome must be CONVERTED or NOT_CONVERTED',
        },
        statusCode: { type: 'number', example: 400 },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  }),
  ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Unauthorized access - invalid token',
        },
        statusCode: { type: 'number', example: 401 },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
  }),
  ApiResponse({
    status: 404,
    description: 'Not Found - Prediction not found',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Prediction with ID not found',
        },
        statusCode: { type: 'number', example: 404 },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  }),
];

/**
 * Delete Prediction Response Documentation
 */
export const DeletePredictionResponse = [
  ApiResponse({
    status: 200,
    description: 'Prediction deleted successfully',
    schema: DeletePredictionResponseSchema,
  }),
  ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Unauthorized access - invalid token',
        },
        statusCode: { type: 'number', example: 401 },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
  }),
  ApiResponse({
    status: 404,
    description: 'Not Found - Prediction not found',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Prediction with ID not found',
        },
        statusCode: { type: 'number', example: 404 },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  }),
  ApiResponse({
    status: 409,
    description: 'Conflict - Cannot delete validated prediction',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Cannot delete prediction that has been validated',
        },
        statusCode: { type: 'number', example: 409 },
        error: { type: 'string', example: 'Conflict' },
      },
    },
  }),
];

/**
 * Generate Single Prediction Response Documentation
 */
export const GeneratePredictionResponse = [
  ApiResponse({
    status: 201,
    description: 'Prediction generated successfully',
    schema: PredictionWithCustomerSchema,
  }),
  ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid customer ID or input data',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Invalid customer ID format',
        },
        statusCode: { type: 'number', example: 400 },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  }),
  ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Unauthorized access - invalid token',
        },
        statusCode: { type: 'number', example: 401 },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
  }),
  ApiResponse({
    status: 404,
    description: 'Not Found - Customer not found',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Customer with ID not found',
        },
        statusCode: { type: 'number', example: 404 },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  }),
  ApiResponse({
    status: 409,
    description: 'Conflict - Prediction already exists',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Prediction already exists for this customer',
        },
        statusCode: { type: 'number', example: 409 },
        error: { type: 'string', example: 'Conflict' },
      },
    },
  }),
  ApiResponse({
    status: 503,
    description: 'Service Unavailable - ML model not available',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Machine learning model is currently unavailable',
        },
        statusCode: { type: 'number', example: 503 },
        error: { type: 'string', example: 'Service Unavailable' },
      },
    },
  }),
];
