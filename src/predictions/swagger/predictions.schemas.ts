import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const PredictionResponseSchema: SchemaObject = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Unique prediction identifier',
      example: 'clp123abc456def789ghi012',
    },
    customerId: {
      type: 'string',
      description: 'Associated customer identifier',
      example: 'clm123abc456def789ghi012',
    },
    score: {
      type: 'number',
      minimum: 0,
      maximum: 1,
      description: 'Lead scoring prediction (0-1 scale)',
      example: 0.85,
    },
    confidence: {
      type: 'number',
      minimum: 0,
      maximum: 1,
      description: 'Model confidence level (0-1 scale)',
      example: 0.92,
    },
    predictedClass: {
      type: 'string',
      enum: ['YES', 'NO'],
      description: 'Predicted conversion outcome',
      example: 'YES',
    },
    model: {
      type: 'string',
      description: 'ML model version used for prediction',
      example: 'lead-scoring-v2.1',
    },
    features: {
      type: 'object',
      description: 'Feature values used in prediction',
      properties: {
        engagement: {
          type: 'number',
          description: 'Customer engagement score',
          example: 0.78,
        },
        demographics: {
          type: 'object',
          description: 'Demographic feature values',
          example: { age_group: 'mid', industry: 'tech' },
        },
        behavioral: {
          type: 'object',
          description: 'Behavioral pattern features',
          example: { page_views: 25, session_duration: 450 },
        },
      },
    },
    predictedAt: {
      type: 'string',
      format: 'date-time',
      description: 'When prediction was generated',
      example: '2024-01-15T10:30:00.000Z',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'Record creation timestamp',
      example: '2024-01-15T10:30:00.000Z',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      description: 'Last update timestamp',
      example: '2024-01-15T15:45:30.000Z',
    },
  },
  required: [
    'id',
    'customerId',
    'score',
    'confidence',
    'predictedClass',
    'model',
  ],
};

export const PredictionWithCustomerSchema: SchemaObject = {
  type: 'object',
  properties: {
    ...PredictionResponseSchema.properties,
    customer: {
      type: 'object',
      description: 'Associated customer details',
      properties: {
        id: {
          type: 'string',
          description: 'Customer identifier',
          example: 'clm123abc456def789ghi012',
        },
        name: {
          type: 'string',
          description: 'Customer full name',
          example: 'John Doe',
        },
        email: {
          type: 'string',
          format: 'email',
          description: 'Customer email address',
          example: 'john.doe@example.com',
        },
        company: {
          type: 'string',
          description: 'Customer company name',
          example: 'Tech Solutions Inc.',
        },
        phone: {
          type: 'string',
          description: 'Customer phone number',
          example: '+1234567890',
        },
        jobTitle: {
          type: 'string',
          description: 'Customer job title',
          example: 'Software Engineer',
        },
        industry: {
          type: 'string',
          description: 'Customer industry',
          example: 'Technology',
        },
      },
      required: ['id', 'name', 'email'],
    },
  },
  required: [
    'id',
    'customerId',
    'score',
    'confidence',
    'predictedClass',
    'customer',
  ],
};

export const PredictionsListResponseSchema: SchemaObject = {
  type: 'object',
  properties: {
    data: {
      type: 'array',
      description: 'Array of prediction records',
      items: PredictionWithCustomerSchema,
    },
    meta: {
      type: 'object',
      description: 'Pagination metadata',
      properties: {
        total: {
          type: 'number',
          description: 'Total number of predictions',
          example: 1250,
        },
        page: {
          type: 'number',
          description: 'Current page number',
          example: 1,
        },
        limit: {
          type: 'number',
          description: 'Items per page',
          example: 20,
        },
        totalPages: {
          type: 'number',
          description: 'Total number of pages',
          example: 63,
        },
      },
      required: ['total', 'page', 'limit', 'totalPages'],
    },
  },
  required: ['data', 'meta'],
};

export const UpdatePredictionRequestSchema: SchemaObject = {
  type: 'object',
  properties: {
    notes: {
      type: 'string',
      maxLength: 1000,
      description: 'Additional notes about the prediction',
      example: 'Customer showed high engagement, prediction validated',
    },
    validated: {
      type: 'boolean',
      description: 'Whether prediction has been manually validated',
      example: true,
    },
    actualOutcome: {
      type: 'string',
      enum: ['CONVERTED', 'NOT_CONVERTED'],
      description: 'Actual conversion outcome for model training',
      example: 'CONVERTED',
    },
    validatedBy: {
      type: 'string',
      description: 'User who validated the prediction',
      example: 'admin@example.com',
    },
    validatedAt: {
      type: 'string',
      format: 'date-time',
      description: 'When prediction was validated',
      example: '2024-01-15T16:30:00.000Z',
    },
  },
  additionalProperties: false,
};

export const GeneratePredictionRequestSchema: SchemaObject = {
  type: 'object',
  properties: {
    customerId: {
      type: 'string',
      description: 'Customer ID to generate prediction for',
      example: 'clm123abc456def789ghi012',
    },
    modelVersion: {
      type: 'string',
      description: 'Specific model version to use (optional)',
      example: 'lead-scoring-v2.1',
    },
    features: {
      type: 'object',
      description: 'Override feature values (for testing)',
      example: { engagement: 0.8, behavioral: { page_views: 30 } },
    },
  },
  required: ['customerId'],
};

/**
 * Delete Prediction Response Schema
 */
export const DeletePredictionResponseSchema: SchemaObject = {
  type: 'object',
  properties: {
    ok: {
      type: 'boolean',
      description: 'Indicates successful deletion',
      example: true,
    },
    message: {
      type: 'string',
      description: 'Confirmation message',
      example: 'Prediction deleted successfully',
    },
    deletedId: {
      type: 'string',
      description: 'ID of deleted prediction',
      example: 'clp123abc456def789ghi012',
    },
  },
  required: ['ok', 'message'],
};
