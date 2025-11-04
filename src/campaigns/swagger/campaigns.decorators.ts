import { applyDecorators } from '@nestjs/common';
import { ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import {
  CreateCampaignRequestSchema,
  UpdateCampaignRequestSchema,
} from './campaigns.schemas';

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
      description: 'Search term to filter campaigns by name or description',
      example: 'Spring Campaign',
    }),
  );

export const CampaignFilterQueries = () =>
  applyDecorators(
    ApiQuery({
      name: 'type',
      required: false,
      enum: ['EMAIL', 'SOCIAL', 'PPC', 'CONTENT'],
      description: 'Filter by campaign type',
      example: 'EMAIL',
    }),
    ApiQuery({
      name: 'status',
      required: false,
      enum: ['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED'],
      description: 'Filter by campaign status',
      example: 'ACTIVE',
    }),
    ApiQuery({
      name: 'startDateFrom',
      required: false,
      type: String,
      description: 'Filter campaigns starting from this date (YYYY-MM-DD)',
      example: '2024-01-01',
    }),
    ApiQuery({
      name: 'startDateTo',
      required: false,
      type: String,
      description: 'Filter campaigns starting until this date (YYYY-MM-DD)',
      example: '2024-12-31',
    }),
    ApiQuery({
      name: 'budgetMin',
      required: false,
      type: Number,
      description: 'Minimum budget filter',
      example: 1000,
    }),
    ApiQuery({
      name: 'budgetMax',
      required: false,
      type: Number,
      description: 'Maximum budget filter',
      example: 10000,
    }),
  );

export const SortingQueries = () =>
  applyDecorators(
    ApiQuery({
      name: 'sortBy',
      required: false,
      enum: ['createdAt', 'name', 'startDate', 'endDate', 'budget', 'status'],
      description: 'Field to sort by (default: createdAt)',
      example: 'startDate',
    }),
    ApiQuery({
      name: 'sortDir',
      required: false,
      enum: ['asc', 'desc'],
      description: 'Sort direction (default: desc)',
      example: 'asc',
    }),
  );

export const CampaignIdParam = () =>
  applyDecorators(
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'Campaign ID',
      example: 'cm123abc-def4-5678-9012-abcdef123456',
    }),
  );

export const CreateCampaignBody = () =>
  applyDecorators(
    ApiBody({
      description: 'Campaign creation data',
      schema: CreateCampaignRequestSchema,
    }),
  );

export const UpdateCampaignBody = () =>
  applyDecorators(
    ApiBody({
      description: 'Campaign update data (all fields optional)',
      schema: UpdateCampaignRequestSchema,
    }),
  );

export const ListCampaignsQueries = () =>
  applyDecorators(
    PaginationQueries(),
    SearchQuery(),
    CampaignFilterQueries(),
    SortingQueries(),
  );
