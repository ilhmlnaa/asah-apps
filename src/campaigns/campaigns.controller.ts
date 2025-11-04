import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Delete,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CampaignsService } from './campaigns.service';
import { Auth } from '../common/decorators/auth.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { ListQueryDto, ListQuerySchema } from '../common/dto/list-query.dto';
import {
  CreateCampaignDto,
  CreateCampaignSchema,
  UpdateCampaignDto,
  UpdateCampaignSchema,
} from './dtos/campaign.dto';
import {
  ApiCreateCampaign,
  ApiRunCampaign,
  ApiListCampaigns,
  ApiGetCampaign,
  ApiUpdateCampaign,
  ApiDeleteCampaign,
  CreateCampaignBody,
  UpdateCampaignBody,
  CampaignIdParam,
  ListCampaignsQueries,
} from './swagger';

@ApiTags('Campaigns')
@ApiBearerAuth('JWT-auth')
@Controller('campaigns')
@Auth(RolesGuard)
export class CampaignsController {
  constructor(private svc: CampaignsService) {}

  @Post()
  @ApiCreateCampaign()
  @CreateCampaignBody()
  @Roles('ADMIN', 'STAFF')
  @UsePipes(new ZodValidationPipe(CreateCampaignSchema))
  create(@Body() dto: CreateCampaignDto) {
    return this.svc.create(dto);
  }

  @Post(':id/run')
  @ApiRunCampaign()
  @CampaignIdParam()
  @Roles('ADMIN', 'STAFF')
  run(@Param('id') id: string) {
    return this.svc.run(id);
  }

  @Get()
  @ApiListCampaigns()
  @ListCampaignsQueries()
  @UsePipes(new ZodValidationPipe(ListQuerySchema))
  list(@Query() query: ListQueryDto) {
    return this.svc.list(query);
  }

  @Get(':id')
  @ApiGetCampaign()
  @CampaignIdParam()
  detail(@Param('id') id: string) {
    return this.svc.detail(id);
  }

  @Patch(':id')
  @ApiUpdateCampaign()
  @CampaignIdParam()
  @UpdateCampaignBody()
  @Roles('ADMIN', 'STAFF')
  update(@Param('id') id: string, @Body() dto: UpdateCampaignDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @ApiDeleteCampaign()
  @CampaignIdParam()
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}
