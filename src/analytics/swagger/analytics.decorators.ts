import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export const TrendGroupByQuery = () =>
  applyDecorators(
    ApiQuery({
      name: 'groupBy',
      required: false,
      enum: ['day', 'week', 'month'],
      description: 'Group trend data by time period (default: week)',
      example: 'week',
    }),
  );

export const DateRangeQueries = () =>
  applyDecorators(
    ApiQuery({
      name: 'startDate',
      required: false,
      type: String,
      description: 'Start date for analytics data (YYYY-MM-DD)',
      example: '2024-01-01',
    }),
    ApiQuery({
      name: 'endDate',
      required: false,
      type: String,
      description: 'End date for analytics data (YYYY-MM-DD)',
      example: '2024-12-31',
    }),
  );

export const AnalyticsFilterQueries = () =>
  applyDecorators(
    ApiQuery({
      name: 'segment',
      required: false,
      enum: ['high-value', 'medium-value', 'low-value', 'all'],
      description: 'Filter analytics by customer segment',
      example: 'high-value',
    }),
    ApiQuery({
      name: 'industry',
      required: false,
      type: String,
      description: 'Filter analytics by industry',
      example: 'Technology',
    }),
    ApiQuery({
      name: 'campaignType',
      required: false,
      enum: ['EMAIL', 'SOCIAL', 'PPC', 'CONTENT'],
      description: 'Filter analytics by campaign type',
      example: 'EMAIL',
    }),
  );

export const MetricsQueries = () =>
  applyDecorators(
    ApiQuery({
      name: 'metrics',
      required: false,
      type: String,
      description:
        'Comma-separated list of metrics to include (customers,predictions,conversions,scores)',
      example: 'customers,predictions,conversions',
    }),
    ApiQuery({
      name: 'includeComparison',
      required: false,
      type: Boolean,
      description: 'Include comparison with previous period',
      example: true,
    }),
  );

export const JobAnalyticsQueries = () =>
  applyDecorators(
    ApiQuery({
      name: 'sortBy',
      required: false,
      enum: [
        'count',
        'averageScore',
        'conversionRate',
        'totalRevenue',
        'jobTitle',
      ],
      description: 'Sort job analytics by specified field (default: count)',
      example: 'conversionRate',
    }),
    ApiQuery({
      name: 'sortDir',
      required: false,
      enum: ['asc', 'desc'],
      description: 'Sort direction (default: desc)',
      example: 'desc',
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      description: 'Limit number of job titles returned (default: 50)',
      example: 20,
    }),
    ApiQuery({
      name: 'minCount',
      required: false,
      type: Number,
      description: 'Minimum customer count to include job title',
      example: 5,
    }),
  );

export const PerformanceQueries = () =>
  applyDecorators(
    ApiQuery({
      name: 'timeframe',
      required: false,
      enum: ['1h', '24h', '7d', '30d'],
      description: 'Timeframe for performance metrics',
      example: '24h',
    }),
    ApiQuery({
      name: 'includeSystemHealth',
      required: false,
      type: Boolean,
      description: 'Include system health metrics in response',
      example: true,
    }),
  );

export const AnalyticsTrendQueries = () =>
  applyDecorators(
    TrendGroupByQuery(),
    DateRangeQueries(),
    AnalyticsFilterQueries(),
    MetricsQueries(),
  );

export const AnalyticsJobQueries = () =>
  applyDecorators(
    JobAnalyticsQueries(),
    DateRangeQueries(),
    AnalyticsFilterQueries(),
  );
