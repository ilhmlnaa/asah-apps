import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const UserResponseSchema: SchemaObject = {
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
      description: 'User email address',
      example: 'user@example.com',
    },
    name: {
      type: 'string',
      description: 'User full name',
      example: 'John Doe',
    },
    role: {
      type: 'string',
      enum: ['USER', 'ADMIN'],
      description: 'User role in the system',
      example: 'USER',
    },
    avatarUrl: {
      type: 'string',
      nullable: true,
      description: 'User profile picture URL',
      example: 'https://example.com/avatar.jpg',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'Account creation timestamp',
      example: '2024-01-15T10:30:00.000Z',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      description: 'Last profile update timestamp',
      example: '2024-01-15T10:30:00.000Z',
    },
  },
  required: ['id', 'email', 'name', 'role'],
};

export const AuthTokenResponseSchema: SchemaObject = {
  type: 'object',
  properties: {
    user: {
      ...UserResponseSchema,
      description: 'Authenticated user information',
    },
    accessToken: {
      type: 'string',
      description: 'JWT access token for API authentication',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    },
  },
  required: ['user', 'accessToken'],
};

/**
 * Register Request Body Schema
 */
export const RegisterRequestSchema: SchemaObject = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      description: 'Valid email address for account creation',
      example: 'newuser@example.com',
    },
    password: {
      type: 'string',
      minLength: 6,
      description: 'Secure password (minimum 6 characters)',
      example: 'securePassword123',
    },
    name: {
      type: 'string',
      minLength: 2,
      description: 'User full name',
      example: 'Jane Smith',
    },
    role: {
      type: 'string',
      enum: ['USER', 'ADMIN'],
      description: 'User role (defaults to USER if not specified)',
      example: 'USER',
      default: 'USER',
    },
  },
  required: ['email', 'password', 'name'],
};

export const LoginRequestSchema: SchemaObject = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      description: 'Registered email address',
      example: 'admin@example.com',
    },
    password: {
      type: 'string',
      description: 'Account password',
      example: 'changeme123',
    },
  },
  required: ['email', 'password'],
};

export const UpdateProfileRequestSchema: SchemaObject = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 2,
      description: 'Updated user full name',
      example: 'John Doe Updated',
    },
    avatarUrl: {
      type: 'string',
      format: 'uri',
      description: 'Updated profile picture URL',
      example: 'https://example.com/new-avatar.jpg',
    },
  },
  additionalProperties: false,
};

export const RefreshTokenResponseSchema: SchemaObject = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string',
      description: 'New JWT access token',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    },
  },
  required: ['accessToken'],
};

export const LogoutResponseSchema: SchemaObject = {
  type: 'object',
  properties: {
    ok: {
      type: 'boolean',
      description: 'Indicates successful logout',
      example: true,
    },
  },
  required: ['ok'],
};

export const CurrentUserProfileSchema: SchemaObject = {
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
      description: 'User email address',
      example: 'user@example.com',
    },
    name: {
      type: 'string',
      description: 'User full name',
      example: 'John Doe',
    },
    role: {
      type: 'string',
      enum: ['USER', 'ADMIN'],
      description: 'User role in the system',
      example: 'USER',
    },
    avatarUrl: {
      type: 'string',
      nullable: true,
      description: 'User profile picture URL',
      example: 'https://example.com/avatar.jpg',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'Account creation timestamp',
      example: '2024-01-15T10:30:00.000Z',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      description: 'Last profile update timestamp',
      example: '2024-01-15T10:30:00.000Z',
    },
  },
  required: ['id', 'email', 'name', 'role', 'createdAt', 'updatedAt'],
};
