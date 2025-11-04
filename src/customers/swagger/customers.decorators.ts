import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import {
  CreateCustomerRequestSchema,
  UpdateCustomerRequestSchema,
} from './customers.schemas';
import {
  CreateCustomerResponse,
  CustomerDetailResponse,
  UpdateCustomerResponse,
  DeleteCustomerResponse,
  ImportCustomersResponse,
  ExportCsvResponse,
  ExportXlsxResponse,
} from './customers.responses';

export const PaginationQueries = () =>
  applyDecorators(
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      description: 'Page number (default: 1)',
      example: 1,
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      description: 'Number of items per page (default: 10, max: 100)',
      example: 10,
    }),
  );

export const SearchQuery = () =>
  applyDecorators(
    ApiQuery({
      name: 'search',
      required: false,
      type: String,
      description:
        'Search term to filter customers by name, extId, or other text fields',
      example: 'John Doe',
    }),
  );

export const SortingQueries = () =>
  applyDecorators(
    ApiQuery({
      name: 'sortBy',
      required: false,
      enum: ['createdAt', 'name', 'age', 'job', 'marital', 'education'],
      description: 'Field to sort by (default: createdAt)',
      example: 'name',
    }),
    ApiQuery({
      name: 'sortDir',
      required: false,
      enum: ['asc', 'desc'],
      description: 'Sort direction (default: desc)',
      example: 'asc',
    }),
  );

export const CustomerFilterQueries = () =>
  applyDecorators(
    ApiQuery({
      name: 'job',
      required: false,
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
      description: 'Filter by job type',
      example: 'management',
    }),
    ApiQuery({
      name: 'marital',
      required: false,
      enum: ['single', 'married', 'divorced', 'unknown'],
      description: 'Filter by marital status',
      example: 'married',
    }),
    ApiQuery({
      name: 'education',
      required: false,
      enum: ['primary', 'secondary', 'tertiary', 'unknown'],
      description: 'Filter by education level',
      example: 'tertiary',
    }),
    ApiQuery({
      name: 'contact',
      required: false,
      enum: ['cellular', 'telephone', 'unknown'],
      description: 'Filter by contact method',
      example: 'cellular',
    }),
    ApiQuery({
      name: 'ageMin',
      required: false,
      type: Number,
      description: 'Minimum age filter (1-120)',
      example: 25,
    }),
    ApiQuery({
      name: 'ageMax',
      required: false,
      type: Number,
      description: 'Maximum age filter (1-120, must be >= ageMin)',
      example: 65,
    }),
  );

export const ListCustomersQueries = () =>
  applyDecorators(
    PaginationQueries(),
    SearchQuery(),
    SortingQueries(),
    CustomerFilterQueries(),
  );

export function ApiCreateCustomer() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new customer with lead scoring',
      description: `
        Create a new customer record with comprehensive lead tracking and scoring capabilities.
        
        **Customer Creation Features:**
        - Automatic lead score calculation based on profile data
        - Email uniqueness validation across the system
        - Industry classification and job title standardization
        - Sales pipeline status tracking (LEAD → PROSPECT → CUSTOMER)
        
        **Required Information:**
        - Name: Customer full name for identification
        - Email: Unique email address for communication and login
        
        **Optional Profile Data:**
        - Phone: Contact number for direct communication
        - Company: Organization name for B2B context
        - Job Title: Professional position for targeting
        - Industry: Business sector for segmentation
        - Status: Pipeline stage for sales tracking
        
        **Business Applications:**
        - Lead Generation: Capture new prospects from marketing campaigns
        - Sales Pipeline: Track customer journey from lead to conversion
        - CRM Integration: Sync with external customer relationship systems
        - Marketing Segmentation: Group customers by industry and role
      `,
      tags: ['Customers'],
    }),
    ApiBody({
      description: 'Customer creation data with lead scoring attributes',
      schema: CreateCustomerRequestSchema,
    }),
    ...CreateCustomerResponse,
  );
}

export function ApiCustomerDetail() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get detailed customer information by ID',
      description: `
        Retrieve comprehensive customer profile including lead score and status.
        
        **Customer Information Includes:**
        - Basic profile data (name, email, phone, company)
        - Professional details (job title, industry)
        - Lead scoring metrics and status tracking
        - Timestamps for creation and last update
        
        **Use Cases:**
        - Customer Profile Review: Complete customer context for sales
        - Lead Qualification: Assess customer potential and status
        - Support Context: Customer information for service requests
        - Analytics: Individual customer performance tracking
      `,
      tags: ['Customers'],
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'Unique customer identifier',
      example: 'clu123abc456def789ghi012',
    }),
    ...CustomerDetailResponse,
  );
}

export function ApiUpdateCustomer() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update customer profile and status',
      description: `
        Update customer information with lead score recalculation and status management.
        
        **Update Capabilities:**
        - Profile Updates: Name, email, phone, company information
        - Professional Data: Job title and industry classification
        - Status Management: Move customers through sales pipeline
        - Lead Score Refresh: Automatic recalculation based on new data
        
        **Business Processes:**
        - Profile Maintenance: Keep customer data current and accurate
        - Pipeline Management: Track customer progression through sales stages
        - Data Quality: Improve lead scoring with better profile information
        - Segmentation Updates: Refine targeting based on updated attributes
        
        **Validation & Safety:**
        - Email uniqueness validation (excluding current customer)
        - Status progression validation (LEAD → PROSPECT → CUSTOMER)
        - Data integrity checks for profile consistency
        - Audit trail maintenance for change tracking
      `,
      tags: ['Customers'],
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'Customer identifier to update',
      example: 'clu123abc456def789ghi012',
    }),
    ApiBody({
      description: 'Customer update data (partial updates supported)',
      schema: UpdateCustomerRequestSchema,
    }),
    ...UpdateCustomerResponse,
  );
}

export function ApiDeleteCustomer() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete customer record with cascade handling',
      description: `
        Permanently delete customer record with comprehensive data cleanup.
        
        **Deletion Safety Checks:**
        - Cascade relationship validation
        - Active campaign participation check
        - Prediction history preservation for analytics
        - Data retention compliance verification
        
        **Data Cleanup Process:**
        - Customer profile removal
        - Associated predictions archival
        - Campaign relationship cleanup
        - Analytics data anonymization
        
        **Business Considerations:**
        - GDPR right to be forgotten compliance
        - Data retention policy enforcement
        - Analytics impact assessment
        - Backup and recovery procedures
      `,
      tags: ['Customers'],
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'Customer identifier to delete',
      example: 'clu123abc456def789ghi012',
    }),
    ...DeleteCustomerResponse,
  );
}

export function ApiImportCustomers() {
  return applyDecorators(
    ApiOperation({
      summary: 'Bulk import customers from file',
      description: `
        Import multiple customers from CSV or Excel files with validation and deduplication.
        
        **Supported File Formats:**
        - CSV: Comma-separated values with header row
        - Excel: .xlsx format with data in first sheet
        
        **Import Process:**
        - File validation and format verification
        - Data cleaning and standardization
        - Duplicate detection and handling
        - Lead score calculation for new customers
        - Batch processing with error reporting
        
        **Expected File Structure:**
        - Required columns: name, email
        - Optional columns: phone, company, jobTitle, industry, status
        - Header row required with exact column names
        - UTF-8 encoding recommended
        
        **Business Applications:**
        - Marketing List Import: Bulk customer acquisition
        - CRM Migration: Transfer customers from legacy systems
        - Event Registration: Import attendee lists as prospects
        - Partner Integration: Sync customer data from external sources
      `,
      tags: ['Customers'],
    }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      description: 'CSV or Excel file with customer data',
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
            description: 'CSV or Excel file containing customer data',
          },
        },
        required: ['file'],
      },
    }),
    ...ImportCustomersResponse,
  );
}

export function ApiExportCsv() {
  return applyDecorators(
    ApiOperation({
      summary: 'Export customers to CSV file',
      description: `
        Export customer data to CSV format for external use and analysis.
        
        **Export Features:**
        - Complete customer profiles with lead scores
        - UTF-8 encoding for international character support
        - Standardized column headers for easy import
        - Filtered data based on current user permissions
        
        **Use Cases:**
        - Data Backup: Regular customer data exports
        - Analytics: External analysis in spreadsheet tools
        - CRM Integration: Import into other customer systems
        - Reporting: Customer lists for management review
      `,
      tags: ['Customers'],
    }),
    ...ExportCsvResponse,
  );
}

export function ApiExportXlsx() {
  return applyDecorators(
    ApiOperation({
      summary: 'Export customers to Excel file',
      description: `
        Export customer data to Excel format with enhanced formatting and analysis features.
        
        **Excel Features:**
        - Formatted columns with proper data types
        - Header styling for professional appearance
        - Auto-sizing columns for optimal readability
        - Multiple sheets for different data views (if applicable)
        
        **Business Applications:**
        - Executive Reporting: Professional customer reports
        - Data Analysis: Advanced Excel features for insights
        - Presentation: Customer data for stakeholder meetings
        - Integration: Import into business intelligence tools
      `,
      tags: ['Customers'],
    }),
    ...ExportXlsxResponse,
  );
}
