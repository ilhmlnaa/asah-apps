import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import {
  AnalyticsOverviewSchema,
  AnalyticsTrendSchema,
  AnalyticsByJobSchema,
  AnalyticsPerformanceSchema,
  BadRequestResponseSchema,
  UnauthorizedResponseSchema,
  ForbiddenResponseSchema,
} from './analytics.schemas';

export const CommonAnalyticsResponses = () =>
  applyDecorators(
    ApiResponse({
      status: 401,
      description: 'Unauthorized - Authentication required',
      schema: UnauthorizedResponseSchema,
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - Insufficient permissions for analytics data',
      schema: ForbiddenResponseSchema,
    }),
  );

// Analytics Overview Operation & Responses
export const AnalyticsOverviewOperation = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get comprehensive analytics overview dashboard',
      description: `Retrieve a comprehensive overview of all key analytics metrics including customer counts, prediction statistics, lead score distributions, and recent activity.
    
**Key Metrics Included:**
- **Customer Analytics**: Total customers, new customers this week
- **Prediction Analytics**: Total predictions made, predictions this week  
- **Lead Scoring**: Average lead score, score distribution breakdown
- **Campaign Analytics**: Active campaigns, campaigns launched this week
- **Conversion Metrics**: Overall conversion rate, high/medium/low value leads
- **Recent Activity**: Weekly activity summary and trends

**Use Cases:**
- **Executive Dashboard**: High-level KPI monitoring for leadership
- **Daily Standup**: Quick overview of key metrics for team meetings
- **Performance Monitoring**: Track system health and prediction accuracy
- **Business Intelligence**: Data-driven decision making support

**Response Structure:**
- Core metrics (totals, averages, rates)
- Lead score distribution across different value segments  
- Recent activity summary for current week
- Additional insights for deeper analysis

**Refresh Rate:**
- Data is updated every 15 minutes
- Real-time for critical metrics like active campaigns
- Historical data aggregated daily at midnight UTC`,
    }),
  );

export const AnalyticsOverviewResponses = () =>
  applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Analytics overview retrieved successfully',
      schema: AnalyticsOverviewSchema,
    }),
    CommonAnalyticsResponses(),
  );

// Analytics Trend Operation & Responses
export const AnalyticsTrendOperation = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get analytics trends with flexible time grouping',
      description: `Retrieve analytics trends grouped by day, week, or month with comprehensive filtering and comparison capabilities.
    
**Time Grouping Options:**
- **Day**: Hourly aggregation, useful for short-term analysis (last 30 days)
- **Week**: Daily aggregation, ideal for medium-term trends (last 12 weeks)  
- **Month**: Weekly aggregation, perfect for long-term planning (last 12 months)

**Trending Metrics:**
- **Customers**: New customer acquisition over time
- **Predictions**: Prediction volume and accuracy trends
- **Conversions**: Conversion rate evolution and patterns
- **Lead Scores**: Average score changes and distribution shifts
- **Campaign Activity**: Active campaigns correlation with performance

**Advanced Features:**
- **Growth Calculation**: Period-over-period growth rates
- **Trend Detection**: Automatic trend direction identification
- **Best/Worst Periods**: Highlights for performance analysis
- **Seasonality Detection**: Identifies recurring patterns

**Filtering Options:**
- **Date Range**: Custom start and end dates
- **Customer Segment**: High/medium/low value leads
- **Industry**: Filter by specific industries
- **Campaign Type**: Email, Social, PPC, Content
- **Metric Selection**: Choose specific metrics to include
- **Comparison Mode**: Include previous period comparisons

**Use Cases:**
- **Performance Tracking**: Monitor KPI trends over time
- **Seasonal Planning**: Identify patterns for campaign timing
- **Growth Analysis**: Measure business growth trajectories  
- **Forecasting**: Data for predictive planning models
- **A/B Testing**: Compare performance across different periods

**Data Freshness:**
- Real-time for current period metrics
- Historical data processed daily
- Trend calculations updated every hour`,
    }),
  );

export const AnalyticsTrendResponses = () =>
  applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Analytics trends retrieved successfully',
      schema: AnalyticsTrendSchema,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Invalid groupBy parameter or date range',
      schema: BadRequestResponseSchema,
    }),
    CommonAnalyticsResponses(),
  );

export const AnalyticsByJobOperation = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get detailed analytics segmented by job titles and industries',
      description: `Retrieve comprehensive analytics data segmented by job titles, including performance metrics, demographic insights, and revenue attribution.
    
**Job Title Analytics Include:**
- **Performance Metrics**: Conversion rates, average lead scores per job
- **Volume Metrics**: Customer count, prediction frequency by role
- **Revenue Analytics**: Total revenue, average deal size per job title
- **Demographic Data**: Average age, industry distribution by role
- **Engagement Metrics**: Campaign response rates by job function

**Industry Correlation:**
- Primary industry mapping for each job title
- Cross-industry job performance comparison
- Industry-specific conversion patterns
- Market penetration analysis by role and industry

**Advanced Insights:**
- **High-Value Segments**: Job titles with highest ROI potential
- **Growth Opportunities**: Emerging job roles and trends
- **Underperforming Segments**: Areas needing attention or strategy changes
- **Revenue Attribution**: Which job titles drive the most business value

**Sorting & Filtering:**
- **Sort Options**: Count, conversion rate, revenue, lead score, alphabetical
- **Filter Options**: Minimum customer count, date range, industry focus
- **Segment Analysis**: High-value vs standard customer comparison
- **Performance Thresholds**: Focus on top/bottom performing segments

**Use Cases:**
- **Target Market Analysis**: Identify highest-value job title segments
- **Sales Strategy**: Prioritize outreach to high-converting roles
- **Marketing Personalization**: Tailor campaigns by job function
- **Product Development**: Understand user personas and needs
- **Competitive Analysis**: Market share by job title and industry
- **Account-Based Marketing**: Focus on specific role-based strategies

**Data Sources:**
- Customer demographic data (CRM integration)
- Prediction model results and accuracy scores  
- Campaign performance metrics by audience segment
- Revenue and conversion tracking by customer attributes
- Industry classification and job title standardization

**Refresh Frequency:**
- Customer counts updated in real-time
- Performance metrics calculated daily
- Revenue data synced every 4 hours
- Industry classifications updated weekly`,
    }),
  );

export const AnalyticsByJobResponses = () =>
  applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Analytics by job title retrieved successfully',
      schema: AnalyticsByJobSchema,
    }),
    CommonAnalyticsResponses(),
  );

export const AnalyticsPerformanceOperation = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get system performance and model accuracy analytics',
      description: `Retrieve detailed performance analytics for the predictive lead scoring system, including model accuracy, data quality metrics, and system health indicators.
    
**Model Performance Metrics:**
- **Accuracy**: Overall prediction accuracy percentage
- **Confidence**: Average confidence level of predictions
- **Precision/Recall**: Detailed classification performance
- **ROC/AUC Scores**: Model discrimination capability
- **Feature Importance**: Top contributing factors to predictions

**Data Quality Assessment:**
- **Completeness**: Percentage of complete customer records
- **Accuracy**: Data validation and error rates
- **Consistency**: Cross-system data synchronization status
- **Freshness**: Data recency and update frequency
- **Coverage**: Geographic and demographic data coverage

**System Health Monitoring:**
- **Uptime**: System availability and reliability
- **Response Time**: API performance and latency metrics
- **Error Rates**: System errors and failure patterns
- **Throughput**: Request volume and processing capacity
- **Resource Utilization**: CPU, memory, and storage usage

**Performance Trends:**
- **Historical Accuracy**: Model performance over time
- **Degradation Detection**: Early warning for model drift
- **Improvement Tracking**: Impact of model updates and retraining
- **Comparative Analysis**: Performance across different segments

**Use Cases:**
- **Model Monitoring**: Track ML model health and performance
- **System Operations**: Ensure reliable service delivery
- **Data Governance**: Maintain high data quality standards
- **Performance Optimization**: Identify bottlenecks and improvements
- **SLA Monitoring**: Track service level agreement compliance
- **Capacity Planning**: Forecast resource needs and scaling

**Alert Thresholds:**
- Model accuracy below 85%
- System uptime below 99.5%
- Response time above 500ms
- Error rate above 0.1%
- Data completeness below 90%

**Reporting Integration:**
- Automated daily performance reports
- Real-time alerts for critical issues
- Weekly trend analysis summaries  
- Monthly model performance reviews`,
    }),
  );

export const AnalyticsPerformanceResponses = () =>
  applyDecorators(
    ApiResponse({
      status: 200,
      description: 'System performance analytics retrieved successfully',
      schema: AnalyticsPerformanceSchema,
    }),
    CommonAnalyticsResponses(),
  );

export const ApiAnalyticsOverview = () =>
  applyDecorators(AnalyticsOverviewOperation(), AnalyticsOverviewResponses());

export const ApiAnalyticsTrend = () =>
  applyDecorators(AnalyticsTrendOperation(), AnalyticsTrendResponses());

export const ApiAnalyticsByJob = () =>
  applyDecorators(AnalyticsByJobOperation(), AnalyticsByJobResponses());

export const ApiAnalyticsPerformance = () =>
  applyDecorators(
    AnalyticsPerformanceOperation(),
    AnalyticsPerformanceResponses(),
  );
