import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  UpdatePredictionRequestSchema,
  GeneratePredictionRequestSchema,
} from './predictions.schemas';
import {
  PredictionsListResponse,
  PredictionDetailResponse,
  UpdatePredictionResponse,
  DeletePredictionResponse,
  GeneratePredictionResponse,
} from './predictions.responses';

export function ApiPredictionsList() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get paginated list of predictions with filtering',
      description: `
        Retrieve predictions with advanced filtering and pagination capabilities.
        
        **Business Use Cases:**
        - Lead Scoring Dashboard: View all customer predictions with scores
        - Sales Pipeline: Filter high-confidence predictions for follow-up
        - Model Performance: Analyze prediction accuracy by score ranges
        - Customer Segmentation: Group customers by prediction outcomes
        
        **Filtering Capabilities:**
        - Customer-specific predictions (customerId filter)
        - Score range filtering (minScore/maxScore for targeted segments)
        - Pagination with customizable page size
        - Sorting by prediction score, confidence, or date
        
        **Performance Optimizations:**
        - Efficient database queries with proper indexing
        - Eager loading of customer details
        - Paginated responses to handle large datasets
        - Caching for frequently accessed prediction lists
        
        **Integration Examples:**
        - Sales CRM: Import high-scoring leads for outreach
        - Marketing Automation: Trigger campaigns based on prediction scores
        - Analytics Dashboard: Display prediction trends and distributions
      `,
      tags: ['Predictions'],
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
      description: 'Number of predictions per page (max 100)',
      example: 20,
    }),
    ApiQuery({
      name: 'customerId',
      required: false,
      type: String,
      description: 'Filter predictions for specific customer',
      example: 'clm123abc456def789ghi012',
    }),
    ApiQuery({
      name: 'minScore',
      required: false,
      type: Number,
      description: 'Minimum prediction score (0-1 scale)',
      example: 0.7,
    }),
    ApiQuery({
      name: 'maxScore',
      required: false,
      type: Number,
      description: 'Maximum prediction score (0-1 scale)',
      example: 1.0,
    }),
    ApiQuery({
      name: 'predictedClass',
      required: false,
      type: String,
      enum: ['YES', 'NO'],
      description: 'Filter by predicted conversion outcome',
      example: 'YES',
    }),
    ApiQuery({
      name: 'validated',
      required: false,
      type: Boolean,
      description: 'Filter by validation status',
      example: true,
    }),
    ...PredictionsListResponse,
  );
}

export function ApiPredictionDetail() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get detailed prediction information by ID',
      description: `
        Retrieve comprehensive prediction details including customer information and model insights.
        
        **Detailed Information Includes:**
        - Complete prediction metrics (score, confidence, predicted class)
        - ML model version and feature importance
        - Customer profile and demographic data
        - Prediction timeline and validation status
        - Feature engineering details for transparency
        
        **Business Applications:**
        - Sales Team: Detailed lead analysis for personalized outreach
        - Model Validation: Review prediction accuracy and feature contributions
        - Customer Service: Understand customer conversion probability
        - Audit Trail: Track prediction history and validation decisions
        
        **Technical Features:**
        - Full customer profile integration
        - Model explainability with feature importance
        - Prediction confidence intervals
        - Historical prediction tracking
        - Validation and outcome tracking
      `,
      tags: ['Predictions'],
    }),
    ApiBearerAuth('JWT-auth'),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'Unique prediction identifier',
      example: 'clp123abc456def789ghi012',
    }),
    ...PredictionDetailResponse,
  );
}

export function ApiUpdatePrediction() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update prediction with validation and outcome data',
      description: `
        Update prediction records with validation status and actual outcomes for model improvement.
        
        **Update Capabilities:**
        - Add validation notes and comments
        - Mark predictions as validated by human reviewers
        - Record actual conversion outcomes for model training
        - Track validation timeline and responsible users
        
        **Model Training Benefits:**
        - Actual outcomes improve model accuracy through feedback loops
        - Validation data helps identify model biases and weaknesses
        - Human insights enhance feature engineering
        - Performance metrics enable model version comparison
        
        **Business Process Integration:**
        - Sales Follow-up: Record conversion results after outreach
        - Quality Assurance: Validate prediction accuracy
        - Model Governance: Maintain prediction audit trail
        - Performance Review: Track prediction vs actual outcomes
        
        **Validation Workflow:**
        1. Sales team contacts high-scoring leads
        2. Record actual conversion outcomes
        3. Add validation notes with context
        4. Update model training dataset
        5. Monitor prediction accuracy improvements
      `,
      tags: ['Predictions'],
    }),
    ApiBearerAuth('JWT-auth'),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'Prediction identifier to update',
      example: 'clp123abc456def789ghi012',
    }),
    ApiBody({
      description: 'Prediction update information (partial updates supported)',
      schema: UpdatePredictionRequestSchema,
    }),
    ...UpdatePredictionResponse,
  );
}

export function ApiDeletePrediction() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete prediction record with safety validations',
      description: `
        Remove prediction records from the system with appropriate safety checks.
        
        **Safety Validations:**
        - Prevent deletion of validated predictions (data integrity)
        - Check for dependent records (campaigns, analytics)
        - Audit trail maintenance for compliance
        - Soft delete option for data recovery
        
        **Use Cases:**
        - Data Cleanup: Remove duplicate or erroneous predictions
        - Model Migration: Clear predictions from deprecated models
        - Privacy Compliance: Remove predictions for deleted customers
        - Testing: Clean up test prediction data
        
        **Business Rules:**
        - Validated predictions require special permissions to delete
        - Cascade deletion handling for related records
        - Audit log maintenance for regulatory compliance
        - Backup creation before irreversible deletions
        
        **Alternative Actions:**
        - Consider archiving instead of deletion for historical analysis
        - Mark predictions as deprecated rather than removing
        - Use soft delete for data recovery capabilities
      `,
      tags: ['Predictions'],
    }),
    ApiBearerAuth('JWT-auth'),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'Prediction identifier to delete',
      example: 'clp123abc456def789ghi012',
    }),
    ...DeletePredictionResponse,
  );
}

export function ApiGeneratePrediction() {
  return applyDecorators(
    ApiOperation({
      summary: 'Generate new prediction for customer using ML model',
      description: `
        Generate real-time prediction for a specific customer using the latest ML model.
        
        **ML Pipeline Process:**
        1. Customer data extraction and validation
        2. Feature engineering and preprocessing
        3. Model inference with confidence calculation
        4. Prediction storage and indexing
        5. Response with detailed prediction metrics
        
        **Model Features:**
        - Latest trained model with current market data
        - Feature importance analysis for explainability
        - Confidence intervals for prediction reliability
        - Real-time inference with sub-second response
        
        **Business Applications:**
        - Real-time Lead Scoring: Score new leads immediately
        - Campaign Optimization: Generate predictions for targeting
        - Sales Prioritization: Score prospects for follow-up priority  
        - A/B Testing: Compare model versions with live predictions
        
        **Integration Scenarios:**
        - CRM Integration: Auto-score new customer entries
        - Web Forms: Score leads from contact forms
        - API Integration: Batch prediction for imported leads
        - Marketing Automation: Trigger campaigns based on scores
        
        **Quality Assurance:**
        - Model version tracking for audit trails
        - Feature validation and data quality checks
        - Confidence thresholds for prediction reliability
        - Fallback mechanisms for model unavailability
      `,
      tags: ['Predictions'],
    }),
    ApiBearerAuth('JWT-auth'),
    ApiBody({
      description: 'Customer information for prediction generation',
      schema: GeneratePredictionRequestSchema,
    }),
    ...GeneratePredictionResponse,
  );
}

export function PredictionsListQueries() {
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
      description: 'Items per page (max 100)',
      example: 20,
    }),
    ApiQuery({
      name: 'customerId',
      required: false,
      type: String,
      description: 'Filter by customer ID',
    }),
    ApiQuery({
      name: 'minScore',
      required: false,
      type: Number,
      description: 'Minimum prediction score (0-1)',
    }),
    ApiQuery({
      name: 'maxScore',
      required: false,
      type: Number,
      description: 'Maximum prediction score (0-1)',
    }),
  );
}
