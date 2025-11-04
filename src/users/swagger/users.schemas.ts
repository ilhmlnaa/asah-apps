import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const UserResponseSchema: SchemaObject = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Unique user identifier',
      example: 'clu123abc456def789ghi012',
    },
    email: {
      type: 'string',
      format: 'email',
      description: 'User email address (unique)',
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
      description: 'User role and permission level',
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
      example: '2024-01-15T15:45:30.000Z',
    },
  },
  required: ['id', 'email', 'name', 'role', 'createdAt', 'updatedAt'],
};

export const UsersListResponseSchema: SchemaObject = {
  type: 'object',
  properties: {
    data: {
      type: 'array',
      description: 'Array of user records',
      items: UserResponseSchema,
    },
    meta: {
      type: 'object',
      description: 'Pagination and filtering metadata',
      properties: {
        total: {
          type: 'number',
          description: 'Total number of users in system',
          example: 1250,
        },
        page: {
          type: 'number',
          description: 'Current page number',
          example: 1,
        },
        limit: {
          type: 'number',
          description: 'Users per page',
          example: 20,
        },
        totalPages: {
          type: 'number',
          description: 'Total number of pages',
          example: 63,
        },
        filtered: {
          type: 'number',
          description: 'Number of users matching current filters',
          example: 850,
        },
      },
      required: ['total', 'page', 'limit', 'totalPages'],
    },
  },
  required: ['data', 'meta'],
};

export const UpdateUserRequestSchema: SchemaObject = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 2,
      maxLength: 100,
      description: 'Updated user full name',
      example: 'Jane Smith Updated',
    },
    email: {
      type: 'string',
      format: 'email',
      description: 'Updated email address (must be unique)',
      example: 'newemail@example.com',
    },
    role: {
      type: 'string',
      enum: ['USER', 'ADMIN'],
      description: 'Updated user role (admin privilege required)',
      example: 'ADMIN',
    },
    avatarUrl: {
      type: 'string',
      format: 'uri',
      nullable: true,
      description: 'Updated profile picture URL',
      example: 'https://example.com/new-avatar.jpg',
    },
  },
  additionalProperties: false,
};

export const DeleteUserResponseSchema: SchemaObject = {
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
      example: 'User deleted successfully',
    },
    deletedId: {
      type: 'string',
      description: 'ID of deleted user',
      example: 'clu123abc456def789ghi012',
    },
    affectedRecords: {
      type: 'object',
      description: 'Related records affected by deletion',
      properties: {
        customers: {
          type: 'number',
          description: 'Number of customer records reassigned',
          example: 5,
        },
        predictions: {
          type: 'number',
          description: 'Number of predictions archived',
          example: 12,
        },
        campaigns: {
          type: 'number',
          description: 'Number of campaigns transferred',
          example: 3,
        },
      },
    },
  },
  required: ['ok', 'message'],
};

export const UserStatsSchema: SchemaObject = {
  type: 'object',
  properties: {
    totalUsers: {
      type: 'number',
      description: 'Total registered users',
      example: 1250,
    },
    activeUsers: {
      type: 'number',
      description: 'Users active in last 30 days',
      example: 890,
    },
    newUsersThisMonth: {
      type: 'number',
      description: 'New registrations this month',
      example: 45,
    },
    roleDistribution: {
      type: 'object',
      description: 'User count by role',
      properties: {
        USER: {
          type: 'number',
          description: 'Regular users count',
          example: 1180,
        },
        ADMIN: {
          type: 'number',
          description: 'Admin users count',
          example: 70,
        },
      },
    },
    topDomains: {
      type: 'array',
      description: 'Most common email domains',
      items: {
        type: 'object',
        properties: {
          domain: { type: 'string', example: 'gmail.com' },
          count: { type: 'number', example: 245 },
        },
      },
    },
  },
  required: ['totalUsers', 'activeUsers', 'roleDistribution'],
};
