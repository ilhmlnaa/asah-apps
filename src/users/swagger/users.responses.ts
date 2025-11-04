import { ApiResponse } from '@nestjs/swagger';
import {
  UsersListResponseSchema,
  UserResponseSchema,
  DeleteUserResponseSchema,
} from './users.schemas';

export const UsersListResponse = [
  ApiResponse({
    status: 200,
    description: 'Users list retrieved successfully',
    schema: UsersListResponseSchema,
  }),
  ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid query parameters',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Validation failed: page must be a positive number',
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
    status: 403,
    description: 'Forbidden - Admin role required',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Access denied - admin privileges required',
        },
        statusCode: { type: 'number', example: 403 },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  }),
];

export const UserDetailResponse = [
  ApiResponse({
    status: 200,
    description: 'User details retrieved successfully',
    schema: UserResponseSchema,
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
    status: 403,
    description: 'Forbidden - Admin role required',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Access denied - admin privileges required',
        },
        statusCode: { type: 'number', example: 403 },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  }),
  ApiResponse({
    status: 404,
    description: 'Not Found - User not found',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User with ID clu123abc456def789ghi012 not found',
        },
        statusCode: { type: 'number', example: 404 },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  }),
];

export const UpdateUserResponse = [
  ApiResponse({
    status: 200,
    description: 'User updated successfully',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'User identifier',
          example: 'clu123abc456def789ghi012',
        },
        email: {
          type: 'string',
          format: 'email',
          description: 'Updated email address',
          example: 'newemail@example.com',
        },
        name: {
          type: 'string',
          description: 'Updated user name',
          example: 'Jane Smith Updated',
        },
        role: {
          type: 'string',
          enum: ['USER', 'ADMIN'],
          description: 'Updated user role',
          example: 'ADMIN',
        },
        avatarUrl: {
          type: 'string',
          nullable: true,
          description: 'Updated avatar URL',
          example: 'https://example.com/new-avatar.jpg',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          description: 'Update timestamp',
          example: '2024-01-15T16:30:00.000Z',
        },
      },
      required: ['id', 'email', 'name', 'role', 'updatedAt'],
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
          example: 'Validation failed: email format is invalid',
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
    status: 403,
    description: 'Forbidden - Admin role required',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Access denied - admin privileges required',
        },
        statusCode: { type: 'number', example: 403 },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  }),
  ApiResponse({
    status: 404,
    description: 'Not Found - User not found',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User with ID not found',
        },
        statusCode: { type: 'number', example: 404 },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  }),
  ApiResponse({
    status: 409,
    description: 'Conflict - Email already exists',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Email address already in use by another user',
        },
        statusCode: { type: 'number', example: 409 },
        error: { type: 'string', example: 'Conflict' },
      },
    },
  }),
];

export const DeleteUserResponse = [
  ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    schema: DeleteUserResponseSchema,
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
    status: 403,
    description: 'Forbidden - Admin role required or self-deletion attempt',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Cannot delete your own admin account',
        },
        statusCode: { type: 'number', example: 403 },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  }),
  ApiResponse({
    status: 404,
    description: 'Not Found - User not found',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User with ID not found',
        },
        statusCode: { type: 'number', example: 404 },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  }),
  ApiResponse({
    status: 409,
    description: 'Conflict - Cannot delete user with active dependencies',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Cannot delete user with active campaigns or predictions',
        },
        statusCode: { type: 'number', example: 409 },
        error: { type: 'string', example: 'Conflict' },
        details: {
          type: 'object',
          properties: {
            activeCampaigns: { type: 'number', example: 3 },
            activePredictions: { type: 'number', example: 15 },
          },
        },
      },
    },
  }),
];
