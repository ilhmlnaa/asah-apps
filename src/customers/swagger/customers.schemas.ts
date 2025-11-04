import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const CustomerResponseSchema: SchemaObject = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: 'cm123abc-def4-5678-9012-abcdef123456',
      description: 'Unique customer identifier',
    },
    extId: {
      type: 'string',
      example: 'EXT001',
      nullable: true,
      description: 'External customer ID',
    },
    name: {
      type: 'string',
      example: 'John Doe',
      description: 'Customer full name',
    },
    age: {
      type: 'number',
      example: 35,
      description: 'Customer age (1-120)',
    },
    job: {
      type: 'string',
      example: 'management',
      enum: [
        'admin',
        'admin.',
        'blue-collar',
        'entrepreneur',
        'housemaid',
        'management',
        'retired',
        'self-employed',
        'services',
        'student',
        'technician',
        'unemployed',
        'unknown',
      ],
      description: 'Customer job type',
    },
    marital: {
      type: 'string',
      example: 'married',
      enum: ['single', 'married', 'divorced', 'unknown'],
      description: 'Marital status',
    },
    education: {
      type: 'string',
      example: 'tertiary',
      enum: ['primary', 'secondary', 'tertiary', 'unknown'],
      description: 'Education level',
    },
    housing: {
      type: 'string',
      example: 'yes',
      enum: ['yes', 'no', 'unknown'],
      description: 'Has housing loan',
    },
    loan: {
      type: 'string',
      example: 'no',
      enum: ['yes', 'no', 'unknown'],
      description: 'Has personal loan',
    },
    contact: {
      type: 'string',
      example: 'cellular',
      enum: ['cellular', 'telephone', 'unknown'],
      description: 'Preferred contact method',
    },
    month: {
      type: 'string',
      example: 'may',
      enum: [
        'jan',
        'feb',
        'mar',
        'apr',
        'may',
        'jun',
        'jul',
        'aug',
        'sep',
        'oct',
        'nov',
        'dec',
      ],
      description: 'Last contact month',
    },
    day_of_week: {
      type: 'string',
      example: 'mon',
      enum: ['mon', 'tue', 'wed', 'thu', 'fri'],
      description: 'Last contact day of week',
    },
    campaign: {
      type: 'number',
      example: 2,
      description: 'Number of contacts performed during this campaign',
    },
    pdays: {
      type: 'number',
      example: 999,
      description: 'Days passed since last contact from previous campaign',
    },
    previous: {
      type: 'number',
      example: 0,
      description: 'Number of contacts performed before this campaign',
    },
    poutcome: {
      type: 'string',
      example: 'nonexistent',
      enum: ['failure', 'nonexistent', 'success', 'unknown', 'other'],
      description: 'Outcome of previous marketing campaign',
    },
    emp_var_rate: {
      type: 'number',
      example: 1.1,
      description: 'Employment variation rate - quarterly indicator',
    },
    cons_price_idx: {
      type: 'number',
      example: 93.994,
      description: 'Consumer price index - monthly indicator',
    },
    cons_conf_idx: {
      type: 'number',
      example: -36.4,
      description: 'Consumer confidence index - monthly indicator',
    },
    euribor3m: {
      type: 'number',
      example: 4.857,
      description: 'Euribor 3 month rate - daily indicator',
    },
    nr_employed: {
      type: 'number',
      example: 5191.0,
      description: 'Number of employees - quarterly indicator',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      example: '2024-01-15T10:30:00Z',
      description: 'Customer creation timestamp',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      example: '2024-01-15T10:30:00Z',
      description: 'Last update timestamp',
    },
  },
};

export const PaginationMetaSchema: SchemaObject = {
  type: 'object',
  properties: {
    total: {
      type: 'number',
      example: 150,
      description: 'Total number of customers matching the filters',
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
      example: 15,
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

export const FiltersSchema: SchemaObject = {
  type: 'object',
  description:
    'Applied filters and sorting options for reference and debugging',
  properties: {
    search: {
      type: 'string',
      example: 'John',
      nullable: true,
      description: 'Search term used',
    },
    job: {
      type: 'string',
      example: 'management',
      nullable: true,
      description: 'Job filter applied',
    },
    marital: {
      type: 'string',
      example: 'married',
      nullable: true,
      description: 'Marital status filter',
    },
    education: {
      type: 'string',
      example: 'tertiary',
      nullable: true,
      description: 'Education level filter',
    },
    contact: {
      type: 'string',
      example: 'cellular',
      nullable: true,
      description: 'Contact method filter',
    },
    ageMin: {
      type: 'number',
      example: 25,
      nullable: true,
      description: 'Minimum age filter',
    },
    ageMax: {
      type: 'number',
      example: 65,
      nullable: true,
      description: 'Maximum age filter',
    },
    sortBy: {
      type: 'string',
      example: 'name',
      description: 'Field used for sorting',
    },
    sortDir: {
      type: 'string',
      example: 'asc',
      description: 'Sort direction applied',
    },
    page: {
      type: 'number',
      example: 1,
      description: 'Current page number',
    },
    limit: {
      type: 'number',
      example: 10,
      description: 'Items per page',
    },
  },
};

/**
 * Create Customer Request Schema
 */
export const CreateCustomerRequestSchema: SchemaObject = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'John Doe',
      description: 'Customer full name',
    },
    email: {
      type: 'string',
      format: 'email',
      example: 'john@example.com',
      description: 'Customer email address',
    },
    phone: {
      type: 'string',
      example: '+1234567890',
      description: 'Customer phone number',
    },
    company: {
      type: 'string',
      example: 'ABC Corp',
      description: 'Customer company',
    },
    jobTitle: {
      type: 'string',
      example: 'Manager',
      description: 'Customer job title',
    },
    industry: {
      type: 'string',
      example: 'Technology',
      description: 'Customer industry',
    },
    status: {
      type: 'string',
      enum: ['LEAD', 'PROSPECT', 'CUSTOMER'],
      example: 'LEAD',
      description: 'Customer status in sales pipeline',
    },
  },
  required: ['name', 'email'],
  additionalProperties: false,
};

export const UpdateCustomerRequestSchema: SchemaObject = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'John Doe Updated',
      description: 'Customer full name',
    },
    email: {
      type: 'string',
      format: 'email',
      example: 'john.updated@example.com',
      description: 'Customer email address',
    },
    phone: {
      type: 'string',
      example: '+1234567890',
      description: 'Customer phone number',
    },
    company: {
      type: 'string',
      example: 'XYZ Corp',
      description: 'Customer company',
    },
    jobTitle: {
      type: 'string',
      example: 'Senior Manager',
      description: 'Customer job title',
    },
    industry: {
      type: 'string',
      example: 'Technology',
      description: 'Customer industry',
    },
    status: {
      type: 'string',
      enum: ['LEAD', 'PROSPECT', 'CUSTOMER'],
      example: 'PROSPECT',
      description: 'Customer status in sales pipeline',
    },
  },
  additionalProperties: false,
};

export const ImportResponseSchema: SchemaObject = {
  type: 'object',
  properties: {
    imported: {
      type: 'number',
      example: 25,
      description: 'Number of customers successfully imported',
    },
    failed: {
      type: 'number',
      example: 0,
      description: 'Number of customers that failed to import',
    },
    message: {
      type: 'string',
      example: 'Import completed successfully',
      description: 'Import operation result message',
    },
  },
  required: ['imported', 'failed', 'message'],
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
      example: 'Customer deleted successfully',
      description: 'Delete operation result message',
    },
  },
  required: ['ok', 'message'],
};

export const ListCustomersResponseSchema: SchemaObject = {
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: CustomerResponseSchema,
    },
    meta: PaginationMetaSchema,
    filters: FiltersSchema,
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
      example: [
        'ageMin must be less than or equal to ageMax',
        'page must be a positive integer',
      ],
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
