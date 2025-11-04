import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import {
  ListCustomersResponseSchema,
  BadRequestResponseSchema,
  UnauthorizedResponseSchema,
} from './customers.schemas';

export const ListCustomersOperation = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get list of customers with filtering, sorting, and pagination',
      description: `Retrieve a paginated list of customers with advanced filtering options including age range, job type, marital status, education level, and more. Supports search functionality and customizable sorting.
    
**Common Usage Patterns:**
- **Basic List**: \`GET /customers\` - Returns first 10 customers
- **Pagination**: \`GET /customers?page=2&limit=20\` - Second page with 20 items
- **Search**: \`GET /customers?search=John\` - Find customers matching "John"
- **Filter by Job**: \`GET /customers?job=management\` - Only management professionals
- **Age Range**: \`GET /customers?ageMin=25&ageMax=50\` - Customers aged 25-50
- **Combined**: \`GET /customers?job=management&education=tertiary&sortBy=name&sortDir=asc\`

**Important Notes:**
- Default pagination: page=1, limit=10
- Maximum limit: 100 items per page
- Age range: ageMin must be ≤ ageMax
- All enum values are case-sensitive`,
    }),
  );

export const ListCustomersResponses = () =>
  applyDecorators(
    ApiResponse({
      status: 200,
      description: 'List of customers retrieved successfully',
      schema: ListCustomersResponseSchema,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Invalid query parameters',
      schema: BadRequestResponseSchema,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized - Authentication required',
      schema: UnauthorizedResponseSchema,
    }),
  );

export const ApiListCustomers = () =>
  applyDecorators(ListCustomersOperation(), ListCustomersResponses());

export const CreateCustomerResponse = [
  ApiResponse({
    status: 201,
    description: 'Customer created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        company: { type: 'string' },
        jobTitle: { type: 'string' },
        industry: { type: 'string' },
        leadScore: { type: 'number' },
        status: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  }),
  ApiResponse({ status: 400, description: 'Bad Request - Invalid input data' }),
  ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  }),
  ApiResponse({
    status: 403,
    description: 'Forbidden - Admin or Staff role required',
  }),
];

export const CustomerDetailResponse = [
  ApiResponse({
    status: 200,
    description: 'Customer details retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        company: { type: 'string' },
        jobTitle: { type: 'string' },
        industry: { type: 'string' },
        leadScore: { type: 'number' },
        status: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  }),
  ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  }),
  ApiResponse({ status: 404, description: 'Customer not found' }),
];

export const UpdateCustomerResponse = [
  ApiResponse({
    status: 200,
    description: 'Customer updated successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        company: { type: 'string' },
        jobTitle: { type: 'string' },
        industry: { type: 'string' },
        leadScore: { type: 'number' },
        status: { type: 'string' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  }),
  ApiResponse({ status: 400, description: 'Bad Request - Invalid input data' }),
  ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  }),
  ApiResponse({
    status: 403,
    description: 'Forbidden - Admin or Staff role required',
  }),
  ApiResponse({ status: 404, description: 'Customer not found' }),
];

export const DeleteCustomerResponse = [
  ApiResponse({
    status: 200,
    description: 'Customer deleted successfully',
    schema: {
      type: 'object',
      properties: {
        ok: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Customer deleted successfully' },
      },
    },
  }),
  ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  }),
  ApiResponse({ status: 403, description: 'Forbidden - Admin role required' }),
  ApiResponse({ status: 404, description: 'Customer not found' }),
];

export const ImportCustomersResponse = [
  ApiResponse({
    status: 201,
    description: 'Customers imported successfully',
    schema: {
      type: 'object',
      properties: {
        imported: { type: 'number', example: 25 },
        failed: { type: 'number', example: 0 },
        message: { type: 'string', example: 'Import completed successfully' },
      },
    },
  }),
  ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid file format or data',
  }),
  ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  }),
  ApiResponse({
    status: 403,
    description: 'Forbidden - Admin or Staff role required',
  }),
];

export const ExportCsvResponse = [
  ApiResponse({
    status: 200,
    description: 'CSV file with customer data',
    content: {
      'text/csv': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  }),
  ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  }),
  ApiResponse({
    status: 403,
    description: 'Forbidden - Admin or Staff role required',
  }),
];

export const ExportXlsxResponse = [
  ApiResponse({
    status: 200,
    description: 'Excel file with customer data',
    content: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  }),
  ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  }),
  ApiResponse({
    status: 403,
    description: 'Forbidden - Admin or Staff role required',
  }),
];
