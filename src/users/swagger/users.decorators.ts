import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UpdateUserRequestSchema } from './users.schemas';
import {
  UsersListResponse,
  UserDetailResponse,
  UpdateUserResponse,
  DeleteUserResponse,
} from './users.responses';

export function ApiUsersList() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get paginated list of users with admin filtering',
      description: `
        Administrative endpoint for comprehensive user management and oversight.
        
        **Admin Dashboard Features:**
        - Complete user directory with role-based filtering
        - Advanced search across names and email addresses
        - Pagination for efficient large dataset handling
        - User activity status and account lifecycle management
        
        **Filtering & Search Capabilities:**
        - Role-based filtering (USER/ADMIN) for permission management
        - Text search across user names and email addresses
        - Pagination with customizable page sizes for performance
        - Sorting by registration date, last activity, and role
        
        **Business Intelligence Applications:**
        - User Growth Analytics: Track registration trends over time
        - Role Distribution: Monitor admin vs regular user ratios
        - Account Management: Identify inactive or problematic accounts
        - Compliance Reporting: Generate user access reports for auditing
        
        **Security & Compliance:**
        - Admin-only access with comprehensive audit logging
        - GDPR compliance with data export and deletion capabilities
        - Role-based access control for user management operations
        - Activity tracking for security monitoring and compliance
        
        **Integration Examples:**
        - HR Systems: Sync employee data with user accounts
        - CRM Integration: Link customer accounts with user profiles
        - Security Systems: Monitor user access patterns and anomalies
        - Reporting Tools: Generate user analytics and compliance reports
      `,
      tags: ['Users Management'],
    }),
    ApiBearerAuth('JWT-auth'),
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      description: 'Page number for pagination (starts from 1)',
      example: 1,
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      description: 'Number of users per page (max 100)',
      example: 20,
    }),
    ApiQuery({
      name: 'search',
      required: false,
      type: String,
      description: 'Search term for names and email addresses',
      example: 'john@example',
    }),
    ApiQuery({
      name: 'role',
      required: false,
      enum: ['USER', 'ADMIN'],
      description: 'Filter users by role',
      example: 'USER',
    }),
    ApiQuery({
      name: 'sortBy',
      required: false,
      enum: ['name', 'email', 'role', 'createdAt', 'updatedAt'],
      description: 'Sort users by field',
      example: 'createdAt',
    }),
    ApiQuery({
      name: 'sortOrder',
      required: false,
      enum: ['asc', 'desc'],
      description: 'Sort order',
      example: 'desc',
    }),
    ...UsersListResponse,
  );
}

export function ApiUserDetail() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get detailed user information by ID',
      description: `
        Administrative endpoint for detailed user profile review and management.
        
        **Comprehensive User Information:**
        - Complete profile data including contact information
        - Account status and role assignment details
        - Registration and last activity timestamps
        - Profile customization and preference settings
        
        **Admin Use Cases:**
        - User Support: Access complete user context for support tickets
        - Account Verification: Review user details for manual verification
        - Role Management: Assess user eligibility for role changes
        - Compliance Review: Gather user data for regulatory requirements
        
        **Security & Privacy:**
        - Admin-only access with full audit trail logging
        - Sensitive data handling with proper access controls
        - GDPR compliance with data access transparency
        - Role-based information disclosure controls
        
        **Integration Scenarios:**
        - Support Systems: Populate user context in support tickets
        - Audit Systems: Provide user details for compliance reporting
        - CRM Integration: Sync detailed user profiles with customer data
        - Security Systems: User behavior analysis and risk assessment
      `,
      tags: ['Users Management'],
    }),
    ApiBearerAuth('JWT-auth'),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'Unique user identifier',
      example: 'clu123abc456def789ghi012',
    }),
    ...UserDetailResponse,
  );
}

export function ApiUpdateUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update user profile and role with admin privileges',
      description: `
        Administrative endpoint for comprehensive user profile and permission management.
        
        **Update Capabilities:**
        - Profile Information: Name, email, and avatar updates
        - Role Management: Promote/demote users between USER and ADMIN roles
        - Account Status: Enable, disable, or modify account settings
        - Contact Information: Update primary communication channels
        
        **Role Management Features:**
        - Secure role promotion with proper authorization checks
        - Role demotion with dependency validation
        - Permission inheritance and access control updates
        - Audit trail for all role changes and assignments
        
        **Business Process Integration:**
        - HR Integration: Sync employee role changes with user accounts
        - Onboarding: Complete user profile setup during employee onboarding
        - Offboarding: Role revocation and account status updates
        - Compliance: Maintain proper access controls and permissions
        
        **Validation & Security:**
        - Email uniqueness validation across the entire system
        - Role change authorization with elevated privilege requirements
        - Input sanitization and validation for security
        - Comprehensive audit logging for compliance requirements
        
        **Error Handling:**
        - Conflict resolution for duplicate email addresses
        - Validation errors with detailed field-specific messages
        - Authorization failures with clear permission requirements
        - Business rule violations with actionable error messages
      `,
      tags: ['Users Management'],
    }),
    ApiBearerAuth('JWT-auth'),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'User identifier to update',
      example: 'clu123abc456def789ghi012',
    }),
    ApiBody({
      description: 'User update information (partial updates supported)',
      schema: UpdateUserRequestSchema,
    }),
    ...UpdateUserResponse,
  );
}

export function ApiDeleteUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete user account with comprehensive safety validations',
      description: `
        Administrative endpoint for secure user account deletion with extensive safety checks.
        
        **Safety Validations & Business Rules:**
        - Prevent self-deletion of admin accounts for security
        - Check for active dependencies (campaigns, predictions, customers)
        - Validate data integrity before irreversible deletion
        - Require elevated permissions for admin account deletion
        
        **Cascade Deletion Handling:**
        - Customer records: Reassign to system admin or archive
        - Predictions: Archive with original user reference maintained
        - Campaigns: Transfer ownership or mark as system-managed
        - Analytics: Preserve data integrity with anonymization
        
        **Compliance & Data Privacy:**
        - GDPR right to be forgotten implementation
        - Complete data removal across all system components
        - Audit trail maintenance for legal compliance
        - Data export options before deletion for records retention
        
        **Alternative Actions:**
        - Account Deactivation: Disable account without deletion
        - Data Archiving: Move user data to archive storage
        - Role Revocation: Remove permissions while preserving account
        - Soft Delete: Mark as deleted while maintaining data integrity
        
        **Recovery & Rollback:**
        - Backup creation before irreversible operations
        - Recovery window for accidental deletions
        - Rollback capabilities for critical business impact
        - Data restoration procedures for emergency recovery
        
        **Business Impact Assessment:**
        - Active relationship analysis before deletion
        - Downstream system impact evaluation
        - Notification to affected users and administrators
        - Migration planning for user-dependent processes
      `,
      tags: ['Users Management'],
    }),
    ApiBearerAuth('JWT-auth'),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'User identifier to delete',
      example: 'clu123abc456def789ghi012',
    }),
    ...DeleteUserResponse,
  );
}

export function UsersListQueries() {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      description: 'Page number (starts from 1)',
      example: 1,
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      description: 'Users per page (max 100)',
      example: 20,
    }),
    ApiQuery({
      name: 'search',
      required: false,
      type: String,
      description: 'Search in names and emails',
    }),
    ApiQuery({
      name: 'role',
      required: false,
      enum: ['USER', 'ADMIN'],
      description: 'Filter by user role',
    }),
  );
}
