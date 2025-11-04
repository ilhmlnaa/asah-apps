import { ApiResponse } from '@nestjs/swagger';
import {
  AuthTokenResponseSchema,
  RefreshTokenResponseSchema,
  LogoutResponseSchema,
  CurrentUserProfileSchema,
} from './auth.schemas';

export const AuthRegisterResponse = [
  ApiResponse({
    status: 201,
    description: 'User registered successfully',
    schema: AuthTokenResponseSchema,
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
    status: 409,
    description: 'Conflict - Email already exists',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User with this email already exists',
        },
        statusCode: { type: 'number', example: 409 },
        error: { type: 'string', example: 'Conflict' },
      },
    },
  }),
];

export const AuthLoginResponse = [
  ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    schema: AuthTokenResponseSchema,
  }),
  ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid credentials format',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Validation failed: email is required',
        },
        statusCode: { type: 'number', example: 400 },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  }),
  ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid email or password',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Invalid credentials',
        },
        statusCode: { type: 'number', example: 401 },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
  }),
  ApiResponse({
    status: 429,
    description: 'Too Many Requests - Rate limit exceeded',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Too many login attempts, please try again later',
        },
        statusCode: { type: 'number', example: 429 },
        error: { type: 'string', example: 'Too Many Requests' },
      },
    },
  }),
];

export const AuthRefreshResponse = [
  ApiResponse({
    status: 200,
    description: 'Token refreshed successfully',
    schema: RefreshTokenResponseSchema,
  }),
  ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or expired refresh token',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Refresh token is invalid or expired',
        },
        statusCode: { type: 'number', example: 401 },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
  }),
  ApiResponse({
    status: 403,
    description: 'Forbidden - Refresh token not provided',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Refresh token is required',
        },
        statusCode: { type: 'number', example: 403 },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  }),
];

export const AuthLogoutResponse = [
  ApiResponse({
    status: 200,
    description: 'User logged out successfully',
    schema: LogoutResponseSchema,
  }),
  ApiResponse({
    status: 500,
    description: 'Internal Server Error - Logout process failed',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Failed to clear authentication tokens',
        },
        statusCode: { type: 'number', example: 500 },
        error: { type: 'string', example: 'Internal Server Error' },
      },
    },
  }),
];

export const AuthMeResponse = [
  ApiResponse({
    status: 200,
    description: 'Current user profile retrieved successfully',
    schema: CurrentUserProfileSchema,
  }),
  ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
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
    description: 'Not Found - User profile not found',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User profile not found',
        },
        statusCode: { type: 'number', example: 404 },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  }),
];

export const AuthUpdateMeResponse = [
  ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Unique user identifier',
          example: 'clp123abc456def789ghi012',
        },
        email: {
          type: 'string',
          format: 'email',
          description: 'User email address (unchanged)',
          example: 'user@example.com',
        },
        name: {
          type: 'string',
          description: 'Updated user full name',
          example: 'John Doe Updated',
        },
        role: {
          type: 'string',
          enum: ['USER', 'ADMIN'],
          description: 'User role (unchanged)',
          example: 'USER',
        },
        avatarUrl: {
          type: 'string',
          nullable: true,
          description: 'Updated profile picture URL',
          example: 'https://example.com/new-avatar.jpg',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          description: 'Profile update timestamp',
          example: '2024-01-15T15:45:30.000Z',
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
          example: 'Validation failed: name must be at least 2 characters',
        },
        statusCode: { type: 'number', example: 400 },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  }),
  ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
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
    status: 422,
    description: 'Unprocessable Entity - Business rule violation',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Profile update failed: invalid avatar URL format',
        },
        statusCode: { type: 'number', example: 422 },
        error: { type: 'string', example: 'Unprocessable Entity' },
      },
    },
  }),
];
