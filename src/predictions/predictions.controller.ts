import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  Patch,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PredictionsService } from './predictions.service';
import { Auth } from '../common/decorators/auth.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import {
  PredictionsListDto,
  PredictionsListSchema,
} from './dtos/list-query-prediction.dto';
import { UpdatePredictionDto } from './dtos/update-prediction.dto';
import {
  ApiPredictionsList,
  ApiPredictionDetail,
  ApiUpdatePrediction,
  ApiDeletePrediction,
  ApiGeneratePrediction,
} from './swagger';

@ApiTags('Predictions')
@ApiBearerAuth('JWT-auth')
@Controller('predictions')
@Auth()
export class PredictionsController {
  constructor(private svc: PredictionsService) {}

  /**
   * Get paginated list of predictions with advanced filtering
   *
   * Usage Examples:
   * - Lead Scoring Dashboard: GET /predictions?minScore=0.7&limit=50
   * - Customer Analysis: GET /predictions?customerId=clm123&page=1
   * - High-Value Leads: GET /predictions?minScore=0.8&predictedClass=YES
   * - Sales Pipeline: GET /predictions?validated=false&minScore=0.6
   *
   * Filtering Capabilities:
   * - Score-based filtering for targeted lead segments
   * - Customer-specific prediction history
   * - Validation status for quality control
   * - Pagination for large datasets
   *
   * Business Intelligence:
   * - Identify high-conversion probability leads
   * - Track prediction accuracy over time
   * - Segment customers by prediction scores
   * - Monitor model performance trends
   */
  @Get()
  @ApiPredictionsList()
  @UsePipes(new ZodValidationPipe(PredictionsListSchema))
  list(@Query() query: PredictionsListDto) {
    return this.svc.list(query);
  }

  /**
   * Get detailed prediction information with customer context
   *
   * Usage Examples:
   * - Sales Review: GET /predictions/{id} for detailed lead analysis
   * - Model Analysis: Review feature importance and prediction confidence
   * - Customer Insights: Understand conversion probability factors
   * - Audit Trail: Track prediction history and validation status
   *
   * Detailed Information:
   * - Complete prediction metrics (score, confidence, class)
   * - ML model version and feature breakdown
   * - Full customer profile and demographics
   * - Prediction timeline and validation data
   * - Feature engineering transparency
   *
   * Business Applications:
   * - Personalized sales approach based on prediction factors
   * - Model explainability for regulatory compliance
   * ì Customer service context for support interactions
   * - Quality assurance for prediction accuracy
   */
  @Get(':id')
  @ApiPredictionDetail()
  detail(@Param('id') id: string) {
    return this.svc.detail(id);
  }

  /**
   * Update prediction with validation and outcome information
   *
   * Usage Examples:
   * - Validation Process: PATCH /predictions/{id} with validated: true
   * - Outcome Tracking: PATCH /predictions/{id} with actualOutcome: 'CONVERTED'
   * - Quality Control: PATCH /predictions/{id} with notes and validation status
   * - Model Training: Record actual outcomes for model improvement
   *
   * Update Capabilities:
   * - Add human validation and quality control notes
   * - Mark predictions as reviewed and validated
   * - Record actual conversion outcomes for model feedback
   * - Track validation timeline and responsible users
   *
   * Model Improvement Workflow:
   * 1. Sales team follows up on high-scoring predictions
   * 2. Record actual conversion outcomes after outreach
   * 3. Add contextual notes about conversion factors
   * 4. Update model training dataset with validated results
   * 5. Monitor prediction accuracy improvements over time
   */
  @Patch(':id')
  @ApiUpdatePrediction()
  update(@Param('id') id: string, @Body() dto: UpdatePredictionDto) {
    return this.svc.update(id, dto);
  }

  /**
   * Delete prediction record with comprehensive safety checks
   *
   * Usage Examples:
   * - Data Cleanup: DELETE /predictions/{id} to remove duplicate predictions
   * - Model Migration: Clear predictions from deprecated model versions
   * - Privacy Compliance: Remove predictions for deleted customers
   * - Testing: Clean up test prediction data after development
   *
   * Safety Validations & Business Rules:
   * - Prevent deletion of validated predictions (maintains data integrity)
   * - Check for dependent records in campaigns and analytics
   * - Maintain comprehensive audit trail for regulatory compliance
   * - Require special permissions for validated prediction deletion
   *
   * Alternative Approaches:
   * - Consider archiving instead of permanent deletion
   * - Use soft delete for potential data recovery needs
   * - Mark predictions as deprecated rather than removing
   * - Create backup snapshots before irreversible operations
   */
  @Delete(':id')
  @ApiDeletePrediction()
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }

  /**
   * Generate real-time prediction for specific customer using latest ML model
   *
   * Usage Examples:
   * - Real-time Lead Scoring: POST /predictions/single for immediate customer evaluation
   * - CRM Integration: Auto-score new customer entries as they're created
   * - Web Form Processing: Score leads from contact forms instantly
   * - Campaign Targeting: Generate predictions for marketing campaign selection
   *
   * ML Pipeline Process:
   * 1. Extract and validate customer data from database
   * 2. Perform feature engineering and data preprocessing
   * 3. Execute model inference with confidence calculation
   * 4. Store prediction results with audit trail
   * 5. Return comprehensive prediction metrics and insights
   *
   * Integration Scenarios:
   * - API Integration: Batch prediction for imported lead lists
   * - Marketing Automation: Trigger targeted campaigns based on scores
   * - Sales Workflow: Prioritize leads based on conversion probability
   * - A/B Testing: Compare different model versions with live data
   *
   * Quality Assurance Features:
   * - Model version tracking for complete audit trails
   * - Data quality validation and feature completeness checks
   * - Confidence thresholds for prediction reliability assessment
   * - Fallback mechanisms for model service unavailability
   */
  @Post('single')
  @ApiGeneratePrediction()
  async predictSingle(@Body() dto: { customerId: string }) {
    return this.svc.predictSingle(dto.customerId);
  }
}
