import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import {
  ListCampaignsResponseSchema,
  CampaignResponseSchema,
  CampaignWithMetricsSchema,
  CampaignRunResponseSchema,
  DeleteResponseSchema,
  BadRequestResponseSchema,
  UnauthorizedResponseSchema,
  ForbiddenResponseSchema,
  NotFoundResponseSchema,
} from './campaigns.schemas';

export const CommonErrorResponses = () =>
  applyDecorators(
    ApiResponse({
      status: 401,
      description: 'Unauthorized - Authentication required',
      schema: UnauthorizedResponseSchema,
    }),
  );

export const AdminStaffResponses = () =>
  applyDecorators(
    CommonErrorResponses(),
    ApiResponse({
      status: 403,
      description: 'Forbidden - Admin or Staff role required',
      schema: ForbiddenResponseSchema,
    }),
  );

export const AdminOnlyResponses = () =>
  applyDecorators(
    CommonErrorResponses(),
    ApiResponse({
      status: 403,
      description: 'Forbidden - Admin role required',
      schema: ForbiddenResponseSchema,
    }),
  );

// Specific Operation Decorators
export const CreateCampaignOperation = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Create a new campaign',
      description: `Create a new marketing campaign with specified details. 
    
**Required Fields:**
- name: Campaign name
- description: Campaign description
- startDate: Campaign start date
- endDate: Campaign end date  
- type: Campaign type (EMAIL, SOCIAL, PPC, CONTENT)

**Optional Fields:**
- targetAudience: Target audience description
- budget: Campaign budget in USD
- status: Campaign status (default: DRAFT)

**Campaign Types:**
- **EMAIL**: Email marketing campaigns
- **SOCIAL**: Social media campaigns
- **PPC**: Pay-per-click advertising
- **CONTENT**: Content marketing campaigns

**Campaign Status:**
- **DRAFT**: Campaign is being prepared
- **ACTIVE**: Campaign is currently running
- **PAUSED**: Campaign is temporarily stopped
- **COMPLETED**: Campaign has finished`,
    }),
  );

export const CreateCampaignResponses = () =>
  applyDecorators(
    ApiResponse({
      status: 201,
      description: 'Campaign created successfully',
      schema: CampaignResponseSchema,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Invalid input data',
      schema: BadRequestResponseSchema,
    }),
    AdminStaffResponses(),
  );

export const RunCampaignOperation = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Run/Execute a campaign',
      description: `Execute a campaign to start the marketing process. 
    
**Prerequisites:**
- Campaign must be in DRAFT or PAUSED status
- Campaign start date should be current or future
- Campaign must have valid configuration

**What happens when running:**
1. Campaign status changes to ACTIVE
2. Marketing processes are initiated
3. Tracking and analytics begin
4. Execution timestamp is recorded

**Restrictions:**
- Cannot run COMPLETED campaigns
- Cannot run campaigns with past end dates
- Only ADMIN and STAFF roles can execute campaigns`,
    }),
  );

export const RunCampaignResponses = () =>
  applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Campaign executed successfully',
      schema: CampaignRunResponseSchema,
    }),
    ApiResponse({
      status: 400,
      description:
        'Bad Request - Campaign cannot be executed (wrong status, past dates, etc.)',
      schema: BadRequestResponseSchema,
    }),
    AdminStaffResponses(),
    ApiResponse({
      status: 404,
      description: 'Campaign not found',
      schema: NotFoundResponseSchema,
    }),
  );

export const ListCampaignsOperation = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get list of campaigns with filtering and pagination',
      description: `Retrieve a paginated list of campaigns with advanced filtering options.
    
**Common Usage Patterns:**
- **Basic List**: \`GET /campaigns\` - Returns first 10 campaigns
- **Pagination**: \`GET /campaigns?page=2&limit=20\` - Second page with 20 items
- **Search**: \`GET /campaigns?search=Spring\` - Find campaigns matching "Spring"
- **Filter by Type**: \`GET /campaigns?type=EMAIL\` - Only email campaigns
- **Filter by Status**: \`GET /campaigns?status=ACTIVE\` - Only active campaigns
- **Date Range**: \`GET /campaigns?startDateFrom=2024-01-01&startDateTo=2024-12-31\`
- **Budget Range**: \`GET /campaigns?budgetMin=1000&budgetMax=5000\`
- **Combined**: \`GET /campaigns?type=EMAIL&status=ACTIVE&sortBy=startDate&sortDir=desc\`

**Filtering Options:**
- **type**: EMAIL, SOCIAL, PPC, CONTENT
- **status**: DRAFT, ACTIVE, PAUSED, COMPLETED
- **Date Range**: startDateFrom, startDateTo
- **Budget Range**: budgetMin, budgetMax
- **Search**: name or description matching

**Sorting Options:**
- **Fields**: createdAt, name, startDate, endDate, budget, status
- **Direction**: asc (ascending), desc (descending)
- **Default**: createdAt desc (newest first)

**Important Notes:**
- Default pagination: page=1, limit=10
- Maximum limit: 100 items per page
- All date filters use YYYY-MM-DD format
- Search is case-insensitive and partial matching`,
    }),
  );

export const ListCampaignsResponses = () =>
  applyDecorators(
    ApiResponse({
      status: 200,
      description: 'List of campaigns retrieved successfully',
      schema: ListCampaignsResponseSchema,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Invalid query parameters',
      schema: BadRequestResponseSchema,
    }),
    CommonErrorResponses(),
  );

export const GetCampaignOperation = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get campaign details by ID',
      description: `Retrieve detailed information about a specific campaign including performance metrics.
    
**Response includes:**
- Basic campaign information (name, description, dates, budget, etc.)
- Current status and type
- Performance metrics (reach, engagement, conversion rate)
- Creation and update timestamps

**Metrics Explanation:**
- **totalReach**: Number of people who saw the campaign
- **totalEngagement**: Number of interactions (clicks, likes, shares, etc.)
- **conversionRate**: Percentage of people who completed desired action

**Use Cases:**
- Campaign performance monitoring
- Detailed campaign analysis
- Campaign editing preparation
- Reporting and analytics`,
    }),
  );

export const GetCampaignResponses = () =>
  applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Campaign details retrieved successfully',
      schema: CampaignWithMetricsSchema,
    }),
    CommonErrorResponses(),
    ApiResponse({
      status: 404,
      description: 'Campaign not found',
      schema: NotFoundResponseSchema,
    }),
  );

export const UpdateCampaignOperation = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Update campaign by ID',
      description: `Update campaign information. All fields are optional - only provide fields you want to change.
    
**Updatable Fields:**
- name: Campaign name
- description: Campaign description
- targetAudience: Target audience description
- startDate: Campaign start date
- endDate: Campaign end date
- budget: Campaign budget
- type: Campaign type
- status: Campaign status

**Important Notes:**
- Only ADMIN and STAFF roles can update campaigns
- Cannot update COMPLETED campaigns (except status)
- Changing status to ACTIVE will start the campaign
- Changing dates of ACTIVE campaigns may affect performance
- Budget changes affect ongoing campaign allocation

**Status Change Rules:**
- DRAFT → ACTIVE: Campaign starts running
- ACTIVE → PAUSED: Campaign temporarily stops
- PAUSED → ACTIVE: Campaign resumes
- Any status → COMPLETED: Campaign ends permanently

**Validation Rules:**
- startDate must be before endDate
- Budget must be positive number
- Cannot set status to ACTIVE if startDate is in the past
- Type changes may require campaign reconfiguration`,
    }),
  );

export const UpdateCampaignResponses = () =>
  applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Campaign updated successfully',
      schema: CampaignResponseSchema,
    }),
    ApiResponse({
      status: 400,
      description:
        'Bad Request - Invalid input data or business rules violation',
      schema: BadRequestResponseSchema,
    }),
    AdminStaffResponses(),
    ApiResponse({
      status: 404,
      description: 'Campaign not found',
      schema: NotFoundResponseSchema,
    }),
  );

export const DeleteCampaignOperation = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Delete campaign by ID',
      description: `Permanently delete a campaign from the system.
    
**Warning:** This action cannot be undone!

**Prerequisites:**
- Only ADMIN role can delete campaigns
- Campaign should be in DRAFT, PAUSED, or COMPLETED status
- Cannot delete ACTIVE campaigns (pause first)

**What gets deleted:**
- Campaign configuration and settings
- Associated analytics data
- Campaign history and logs
- Related customer interactions

**Before deletion:**
- Consider pausing instead of deleting active campaigns
- Export important analytics data if needed
- Ensure no dependent processes are running
- Verify campaign is not referenced elsewhere

**Alternative Actions:**
- Set status to COMPLETED to end campaign without deletion
- Set status to PAUSED to temporarily stop campaign
- Archive campaign data before deletion if needed`,
    }),
  );

export const DeleteCampaignResponses = () =>
  applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Campaign deleted successfully',
      schema: DeleteResponseSchema,
    }),
    AdminOnlyResponses(),
    ApiResponse({
      status: 404,
      description: 'Campaign not found',
      schema: NotFoundResponseSchema,
    }),
  );

// Combined decorators for complete endpoints
export const ApiCreateCampaign = () =>
  applyDecorators(CreateCampaignOperation(), CreateCampaignResponses());

export const ApiRunCampaign = () =>
  applyDecorators(RunCampaignOperation(), RunCampaignResponses());

export const ApiListCampaigns = () =>
  applyDecorators(ListCampaignsOperation(), ListCampaignsResponses());

export const ApiGetCampaign = () =>
  applyDecorators(GetCampaignOperation(), GetCampaignResponses());

export const ApiUpdateCampaign = () =>
  applyDecorators(UpdateCampaignOperation(), UpdateCampaignResponses());

export const ApiDeleteCampaign = () =>
  applyDecorators(DeleteCampaignOperation(), DeleteCampaignResponses());
