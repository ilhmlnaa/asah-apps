import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const CampaignResponseSchema: SchemaObject = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: 'cm123abc-def4-5678-9012-abcdef123456',
      description: 'Unique campaign identifier',
    },
    name: {
      type: 'string',
      example: 'Spring Marketing Campaign',
      description: 'Campaign name',
    },
    description: {
      type: 'string',
      example: 'Campaign to promote spring products',
      description: 'Campaign description',
    },
    targetAudience: {
      type: 'string',
      example: 'High-value leads',
      description: 'Target audience description',
    },
    startDate: {
      type: 'string',
      format: 'date-time',
      example: '2024-03-01T00:00:00Z',
      description: 'Campaign start date',
    },
    endDate: {
      type: 'string',
      format: 'date-time',
      example: '2024-03-31T23:59:59Z',
      description: 'Campaign end date',
    },
    budget: {
      type: 'number',
      example: 5000,
      description: 'Campaign budget in USD',
    },
    type: {
      type: 'string',
      enum: ['EMAIL', 'SOCIAL', 'PPC', 'CONTENT'],
      example: 'EMAIL',
      description: 'Campaign type',
    },
    status: {
      type: 'string',
      enum: ['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED'],
      example: 'DRAFT',
      description: 'Campaign status',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      example: '2024-01-15T10:30:00Z',
      description: 'Campaign creation timestamp',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      example: '2024-01-15T10:30:00Z',
      description: 'Last update timestamp',
    },
  },
};

export const CampaignWithMetricsSchema: SchemaObject = {
  type: 'object',
  properties: {
    ...CampaignResponseSchema.properties,
    metrics: {
      type: 'object',
      properties: {
        totalReach: {
          type: 'number',
          example: 1500,
          description: 'Total number of people reached',
        },
        totalEngagement: {
          type: 'number',
          example: 350,
          description: 'Total engagement count',
        },
        conversionRate: {
          type: 'number',
          example: 0.23,
          description: 'Conversion rate percentage',
        },
      },
      description: 'Campaign performance metrics',
    },
  },
};

export const PaginationMetaSchema: SchemaObject = {
  type: 'object',
  properties: {
    total: {
      type: 'number',
      example: 25,
      description: 'Total number of campaigns',
    },
    page: {
      type: 'number',
      example: 1,
      description: 'Current page number',
    },
    limit: {
      type: 'number',
      example: 10,
      description: 'Number of items per page',
    },
    totalPages: {
      type: 'number',
      example: 3,
      description: 'Total number of pages',
    },
    hasNextPage: {
      type: 'boolean',
      example: true,
      description: 'Whether there is a next page',
    },
    hasPrevPage: {
      type: 'boolean',
      example: false,
      description: 'Whether there is a previous page',
    },
  },
};

export const ListCampaignsResponseSchema: SchemaObject = {
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: CampaignResponseSchema,
    },
    meta: PaginationMetaSchema,
  },
};

export const CreateCampaignRequestSchema: SchemaObject = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'Spring Marketing Campaign',
      description: 'Campaign name (required)',
    },
    description: {
      type: 'string',
      example: 'Campaign to promote spring products',
      description: 'Campaign description (required)',
    },
    targetAudience: {
      type: 'string',
      example: 'High-value leads',
      description: 'Target audience description',
    },
    startDate: {
      type: 'string',
      format: 'date-time',
      example: '2024-03-01T00:00:00Z',
      description: 'Campaign start date (required)',
    },
    endDate: {
      type: 'string',
      format: 'date-time',
      example: '2024-03-31T23:59:59Z',
      description: 'Campaign end date (required)',
    },
    budget: {
      type: 'number',
      example: 5000,
      description: 'Campaign budget in USD',
    },
    type: {
      type: 'string',
      enum: ['EMAIL', 'SOCIAL', 'PPC', 'CONTENT'],
      example: 'EMAIL',
      description: 'Campaign type (required)',
    },
    status: {
      type: 'string',
      enum: ['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED'],
      example: 'DRAFT',
      description: 'Campaign status (default: DRAFT)',
    },
  },
  required: ['name', 'description', 'startDate', 'endDate', 'type'],
};

export const UpdateCampaignRequestSchema: SchemaObject = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'Updated Campaign Name',
      description: 'Campaign name',
    },
    description: {
      type: 'string',
      example: 'Updated campaign description',
      description: 'Campaign description',
    },
    targetAudience: {
      type: 'string',
      example: 'Medium-value leads',
      description: 'Target audience description',
    },
    startDate: {
      type: 'string',
      format: 'date-time',
      example: '2024-03-01T00:00:00Z',
      description: 'Campaign start date',
    },
    endDate: {
      type: 'string',
      format: 'date-time',
      example: '2024-03-31T23:59:59Z',
      description: 'Campaign end date',
    },
    budget: {
      type: 'number',
      example: 7500,
      description: 'Campaign budget in USD',
    },
    type: {
      type: 'string',
      enum: ['EMAIL', 'SOCIAL', 'PPC', 'CONTENT'],
      example: 'SOCIAL',
      description: 'Campaign type',
    },
    status: {
      type: 'string',
      enum: ['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED'],
      example: 'ACTIVE',
      description: 'Campaign status',
    },
  },
};

// Campaign Run Response Schema
export const CampaignRunResponseSchema: SchemaObject = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: 'cm123abc-def4-5678-9012-abcdef123456',
      description: 'Campaign ID',
    },
    status: {
      type: 'string',
      example: 'ACTIVE',
      description: 'New campaign status',
    },
    executedAt: {
      type: 'string',
      format: 'date-time',
      example: '2024-01-15T10:30:00Z',
      description: 'Campaign execution timestamp',
    },
    message: {
      type: 'string',
      example: 'Campaign started successfully',
      description: 'Execution result message',
    },
  },
};

export const DeleteResponseSchema: SchemaObject = {
  type: 'object',
  properties: {
    ok: {
      type: 'boolean',
      example: true,
      description: 'Operation success status',
    },
    message: {
      type: 'string',
      example: 'Campaign deleted successfully',
      description: 'Success message',
    },
  },
};

export const ErrorResponseSchema: SchemaObject = {
  type: 'object',
  properties: {
    statusCode: { type: 'number' },
    message: {
      oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
    },
    error: { type: 'string' },
  },
};

export const BadRequestResponseSchema: SchemaObject = {
  ...ErrorResponseSchema,
  properties: {
    ...ErrorResponseSchema.properties,
    statusCode: { type: 'number', example: 400 },
    message: {
      type: 'array',
      items: { type: 'string' },
      example: ['name should not be empty', 'startDate must be a valid date'],
    },
    error: { type: 'string', example: 'Bad Request' },
  },
};

export const UnauthorizedResponseSchema: SchemaObject = {
  ...ErrorResponseSchema,
  properties: {
    ...ErrorResponseSchema.properties,
    statusCode: { type: 'number', example: 401 },
    message: { type: 'string', example: 'Unauthorized' },
    error: { type: 'string', example: 'Unauthorized' },
  },
};

export const ForbiddenResponseSchema: SchemaObject = {
  ...ErrorResponseSchema,
  properties: {
    ...ErrorResponseSchema.properties,
    statusCode: { type: 'number', example: 403 },
    message: { type: 'string', example: 'Forbidden resource' },
    error: { type: 'string', example: 'Forbidden' },
  },
};

export const NotFoundResponseSchema: SchemaObject = {
  ...ErrorResponseSchema,
  properties: {
    ...ErrorResponseSchema.properties,
    statusCode: { type: 'number', example: 404 },
    message: { type: 'string', example: 'Campaign not found' },
    error: { type: 'string', example: 'Not Found' },
  },
};
