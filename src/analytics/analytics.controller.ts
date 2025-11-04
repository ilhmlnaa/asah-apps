import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { Auth } from '../common/decorators/auth.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { TrendQueryDto, TrendQuerySchema } from './dtos/trend-query.dto';
import {
  ApiAnalyticsOverview,
  ApiAnalyticsTrend,
  ApiAnalyticsByJob,
} from './swagger';

@ApiTags('Analytics')
@ApiBearerAuth('JWT-auth')
@Controller('analytics')
@Auth()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('overview')
  @ApiAnalyticsOverview()
  async getOverview() {
    return this.analyticsService.getOverview();
  }

  @Get('trend')
  @ApiAnalyticsTrend()
  @UsePipes(new ZodValidationPipe(TrendQuerySchema))
  async getTrend(@Query() query: TrendQueryDto) {
    return this.analyticsService.getTrend(query.groupBy);
  }

  @Get('by-job')
  @ApiAnalyticsByJob()
  async getByJob() {
    return this.analyticsService.getByJob();
  }
}
