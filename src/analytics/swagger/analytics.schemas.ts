import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const AnalyticsOverviewSchema: SchemaObject = {
  type: 'object',
  properties: {
    totalCustomers: {
      type: 'number',
      example: 1250,
      description: 'Total number of customers in the system',
    },
    totalPredictions: {
      type: 'number',
      example: 980,
      description: 'Total number of predictions made',
    },
    averageLeadScore: {
      type: 'number',
      example: 0.72,
      description: 'Average lead score across all customers (0-1)',
    },
    conversionRate: {
      type: 'number',
      example: 0.25,
      description: 'Overall conversion rate percentage (0-1)',
    },
    activeCampaigns: {
      type: 'number',
      example: 5,
      description: 'Number of currently active campaigns',
    },
    highValueLeads: {
      type: 'number',
      example: 320,
      description: 'Number of high-value leads (score > 0.7)',
    },
    mediumValueLeads: {
      type: 'number',
      example: 450,
      description: 'Number of medium-value leads (score 0.4-0.7)',
    },
    lowValueLeads: {
      type: 'number',
      example: 480,
      description: 'Number of low-value leads (score < 0.4)',
    },
    recentActivity: {
      type: 'object',
      properties: {
        newCustomersThisWeek: {
          type: 'number',
          example: 15,
          description: 'New customers added this week',
        },
        predictionsThisWeek: {
          type: 'number',
          example: 25,
          description: 'Predictions made this week',
        },
        campaignsLaunched: {
          type: 'number',
          example: 2,
          description: 'Campaigns launched this week',
        },
      },
      description: 'Recent activity metrics for the current week',
    },
    leadScoreDistribution: {
      type: 'object',
      properties: {
        excellent: {
          type: 'number',
          example: 120,
          description: 'Leads with score 0.9-1.0',
        },
        good: {
          type: 'number',
          example: 200,
          description: 'Leads with score 0.7-0.9',
        },
        average: {
          type: 'number',
          example: 450,
          description: 'Leads with score 0.4-0.7',
        },
        poor: {
          type: 'number',
          example: 380,
          description: 'Leads with score 0.2-0.4',
        },
        veryPoor: {
          type: 'number',
          example: 100,
          description: 'Leads with score 0.0-0.2',
        },
      },
      description: 'Distribution of lead scores across different ranges',
    },
  },
};

export const AnalyticsTrendSchema: SchemaObject = {
  type: 'object',
  properties: {
    groupBy: {
      type: 'string',
      enum: ['day', 'week', 'month'],
      example: 'week',
      description: 'Time period used for grouping the data',
    },
    data: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          period: {
            type: 'string',
            example: '2024-03-01',
            description: 'Start date of the period (YYYY-MM-DD)',
          },
          customers: {
            type: 'number',
            example: 45,
            description: 'Number of customers added in this period',
          },
          predictions: {
            type: 'number',
            example: 38,
            description: 'Number of predictions made in this period',
          },
          conversions: {
            type: 'number',
            example: 12,
            description: 'Number of conversions in this period',
          },
          averageScore: {
            type: 'number',
            example: 0.74,
            description: 'Average lead score for this period',
          },
          campaignsActive: {
            type: 'number',
            example: 3,
            description: 'Number of active campaigns in this period',
          },
        },
      },
      description: 'Trend data grouped by the specified time period',
    },
    summary: {
      type: 'object',
      properties: {
        totalPeriods: {
          type: 'number',
          example: 12,
          description: 'Total number of periods in the dataset',
        },
        growth: {
          type: 'number',
          example: 0.15,
          description:
            'Growth rate compared to previous period (0.15 = 15% growth)',
        },
        trend: {
          type: 'string',
          enum: ['increasing', 'decreasing', 'stable'],
          example: 'increasing',
          description: 'Overall trend direction',
        },
        bestPeriod: {
          type: 'string',
          example: '2024-03-15',
          description: 'Period with highest performance',
        },
        worstPeriod: {
          type: 'string',
          example: '2024-02-01',
          description: 'Period with lowest performance',
        },
      },
      description: 'Summary statistics and insights about the trend data',
    },
  },
};

export const AnalyticsByJobSchema: SchemaObject = {
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          jobTitle: {
            type: 'string',
            example: 'Marketing Manager',
            description: 'Job title/position',
          },
          count: {
            type: 'number',
            example: 45,
            description: 'Number of customers with this job title',
          },
          averageScore: {
            type: 'number',
            example: 0.78,
            description: 'Average lead score for customers with this job',
          },
          conversionRate: {
            type: 'number',
            example: 0.32,
            description: 'Conversion rate for this job title (0-1)',
          },
          industry: {
            type: 'string',
            example: 'Technology',
            description: 'Primary industry for this job title',
          },
          totalRevenue: {
            type: 'number',
            example: 125000,
            description: 'Total revenue generated from this job segment',
          },
          averageAge: {
            type: 'number',
            example: 35,
            description: 'Average age of customers with this job',
          },
        },
      },
      description: 'Analytics data grouped by job title',
    },
    summary: {
      type: 'object',
      properties: {
        totalJobTitles: {
          type: 'number',
          example: 25,
          description: 'Total number of unique job titles',
        },
        highestConvertingJob: {
          type: 'string',
          example: 'CEO',
          description: 'Job title with highest conversion rate',
        },
        lowestConvertingJob: {
          type: 'string',
          example: 'Intern',
          description: 'Job title with lowest conversion rate',
        },
        averageScoreAcrossJobs: {
          type: 'number',
          example: 0.65,
          description: 'Average lead score across all job titles',
        },
        topRevenueGeneratingJob: {
          type: 'string',
          example: 'Senior Director',
          description: 'Job title generating the most revenue',
        },
        mostCommonJob: {
          type: 'string',
          example: 'Marketing Manager',
          description: 'Most frequently occurring job title',
        },
      },
      description: 'Summary insights about job title analytics',
    },
    insights: {
      type: 'object',
      properties: {
        highValueJobs: {
          type: 'array',
          items: { type: 'string' },
          example: ['CEO', 'CTO', 'VP Marketing'],
          description: 'Job titles with highest average scores',
        },
        growingSegments: {
          type: 'array',
          items: { type: 'string' },
          example: ['Data Scientist', 'Product Manager'],
          description: 'Job segments showing growth in recent periods',
        },
        underperformingJobs: {
          type: 'array',
          items: { type: 'string' },
          example: ['Junior Developer', 'Intern'],
          description: 'Job titles with below-average performance',
        },
      },
      description: 'Additional insights and recommendations',
    },
  },
};

export const AnalyticsPerformanceSchema: SchemaObject = {
  type: 'object',
  properties: {
    modelAccuracy: {
      type: 'number',
      example: 0.87,
      description: 'Machine learning model accuracy (0-1)',
    },
    predictionConfidence: {
      type: 'number',
      example: 0.92,
      description: 'Average confidence level of predictions',
    },
    dataQuality: {
      type: 'object',
      properties: {
        completeness: {
          type: 'number',
          example: 0.95,
          description: 'Data completeness percentage',
        },
        accuracy: {
          type: 'number',
          example: 0.89,
          description: 'Data accuracy score',
        },
        consistency: {
          type: 'number',
          example: 0.91,
          description: 'Data consistency score',
        },
      },
      description: 'Data quality metrics',
    },
    systemHealth: {
      type: 'object',
      properties: {
        uptime: {
          type: 'number',
          example: 99.9,
          description: 'System uptime percentage',
        },
        responseTime: {
          type: 'number',
          example: 245,
          description: 'Average API response time in milliseconds',
        },
        errorRate: {
          type: 'number',
          example: 0.001,
          description: 'System error rate (0-1)',
        },
      },
      description: 'System performance and health metrics',
    },
  },
};

export const ErrorResponseSchema: SchemaObject = {
  type: 'object',
  properties: {
    statusCode: { type: 'number' },
    message: {
      oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
    },
    error: { type: 'string' },
  },
};

export const BadRequestResponseSchema: SchemaObject = {
  ...ErrorResponseSchema,
  properties: {
    ...ErrorResponseSchema.properties,
    statusCode: { type: 'number', example: 400 },
    message: {
      type: 'array',
      items: { type: 'string' },
      example: [
        'groupBy must be one of: day, week, month',
        'Invalid time period specified',
      ],
    },
    error: { type: 'string', example: 'Bad Request' },
  },
};

export const UnauthorizedResponseSchema: SchemaObject = {
  ...ErrorResponseSchema,
  properties: {
    ...ErrorResponseSchema.properties,
    statusCode: { type: 'number', example: 401 },
    message: { type: 'string', example: 'Unauthorized' },
    error: { type: 'string', example: 'Unauthorized' },
  },
};

export const ForbiddenResponseSchema: SchemaObject = {
  ...ErrorResponseSchema,
  properties: {
    ...ErrorResponseSchema.properties,
    statusCode: { type: 'number', example: 403 },
    message: {
      type: 'string',
      example: 'Insufficient permissions to access analytics data',
    },
    error: { type: 'string', example: 'Forbidden' },
  },
};
