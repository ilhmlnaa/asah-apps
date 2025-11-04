import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiCookieAuth,
} from '@nestjs/swagger';
import {
  RegisterRequestSchema,
  LoginRequestSchema,
  UpdateProfileRequestSchema,
} from './auth.schemas';
import {
  AuthRegisterResponse,
  AuthLoginResponse,
  AuthRefreshResponse,
  AuthLogoutResponse,
  AuthMeResponse,
  AuthUpdateMeResponse,
} from './auth.responses';

export function ApiUserRegister() {
  return applyDecorators(
    ApiOperation({
      summary: 'Register a new user account',
      description: `
        Create a new user account in the system with email verification.
        
        **Business Rules:**
        - Email must be unique across the system
        - Password must meet security requirements (min 6 characters)
        - User role defaults to 'USER' if not specified
        - Admin role requires elevated permissions
        
        **Security Features:**
        - Password hashing with bcrypt
        - JWT token generation for immediate authentication
        - Secure HTTP-only refresh token cookie
        - CSRF protection with SameSite cookie policy
        
        **Integration Notes:**
        - Returns both access token and user profile
        - Refresh token automatically stored in secure cookie
        - Ready for immediate API authentication
      `,
      tags: ['Authentication'],
    }),
    ApiBody({
      description: 'User registration information',
      schema: RegisterRequestSchema,
    }),
    ...AuthRegisterResponse,
  );
}

export function ApiUserLogin() {
  return applyDecorators(
    ApiOperation({
      summary: 'Authenticate user login',
      description: `
        Authenticate existing user with email and password credentials.
        
        **Authentication Flow:**
        1. Validate email format and password requirements
        2. Verify credentials against database
        3. Generate JWT access token (short-lived)
        4. Create refresh token (long-lived, HTTP-only cookie)
        5. Return user profile and access token
        
        **Security Measures:**
        - bcrypt password verification
        - Rate limiting protection (configured at gateway level)
        - Secure cookie configuration for refresh tokens
        - JWT token rotation on refresh
        
        **Usage Examples:**
        - Frontend Login: Store accessToken in memory/secure storage
        - Mobile Apps: Handle token refresh automatically
        - API Integration: Use Bearer token for subsequent requests
      `,
      tags: ['Authentication'],
    }),
    ApiBody({
      description: 'User login credentials',
      schema: LoginRequestSchema,
    }),
    ...AuthLoginResponse,
  );
}

export function ApiTokenRefresh() {
  return applyDecorators(
    ApiOperation({
      summary: 'Refresh authentication token',
      description: `
        Generate new access token using valid refresh token from cookie.
        
        **Refresh Token Flow:**
        1. Extract refresh token from HTTP-only cookie
        2. Validate token signature and expiration
        3. Generate new access token pair
        4. Update refresh token cookie
        5. Return new access token
        
        **Security Benefits:**
        - Refresh tokens are HTTP-only (XSS protection)
        - Automatic token rotation (security best practice)
        - Short access token lifespan reduces attack window
        - Cookie-based refresh tokens prevent token theft
        
        **Client Implementation:**
        - Automatically called when access token expires
        - Handle 401 responses by triggering refresh
        - Seamless user experience with background refresh
      `,
      tags: ['Authentication'],
    }),
    ApiCookieAuth(),
    ...AuthRefreshResponse,
  );
}

export function ApiUserLogout() {
  return applyDecorators(
    ApiOperation({
      summary: 'Logout current user session',
      description: `
        Securely terminate user session and clear authentication tokens.
        
        **Logout Process:**
        1. Clear refresh token cookie from browser
        2. Invalidate current session (optional: token blacklisting)
        3. Return confirmation of successful logout
        
        **Security Features:**
        - Complete token cleanup prevents session hijacking
        - Secure cookie clearing with proper flags
        - Immediate session termination
        
        **Best Practices:**
        - Always call logout before user session ends
        - Clear client-side tokens after logout response
        - Redirect to login page after successful logout
      `,
      tags: ['Authentication'],
    }),
    ...AuthLogoutResponse,
  );
}

export function ApiCurrentUserProfile() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get current user profile',
      description: `
        Retrieve authenticated user's complete profile information.
        
        **Profile Information Includes:**
        - Basic identity (id, email, name)
        - Role and permissions
        - Profile customization (avatar)
        - Account timestamps (created, updated)
        
        **Usage Scenarios:**
        - User Dashboard: Display current user info
        - Profile Management: Pre-populate forms
        - Role-based UI: Show/hide features based on role
        - Session Validation: Verify current user identity
        
        **Security Notes:**
        - Requires valid JWT Bearer token
        - Returns current user data only (no admin access)
        - Sensitive data (password) never included in response
      `,
      tags: ['Authentication', 'User Profile'],
    }),
    ApiBearerAuth('JWT-auth'),
    ...AuthMeResponse,
  );
}

export function ApiUpdateUserProfile() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update current user profile',
      description: `
        Update authenticated user's profile information with validation.
        
        **Updatable Fields:**
        - name: Full name (minimum 2 characters)
        - avatarUrl: Profile picture URL (must be valid URI)
        
        **Validation Rules:**
        - Name must be at least 2 characters long
        - Avatar URL must be valid URI format
        - Email cannot be changed (requires separate endpoint)
        - Role cannot be self-modified (admin-only operation)
        
        **Business Logic:**
        - Automatic timestamp update (updatedAt)
        - Partial updates supported (send only changed fields)
        - Validation errors return detailed field-specific messages
        
        **Integration Examples:**
        - Profile Settings Page: Update name and avatar
        - Account Management: Bulk profile updates
        - Social Features: Profile picture changes
      `,
      tags: ['Authentication', 'User Profile'],
    }),
    ApiBearerAuth('JWT-auth'),
    ApiBody({
      description: 'Profile update information (partial updates supported)',
      schema: UpdateProfileRequestSchema,
    }),
    ...AuthUpdateMeResponse,
  );
}
