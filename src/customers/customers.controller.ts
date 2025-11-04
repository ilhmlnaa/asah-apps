import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  ListCustomersQueries,
  ApiListCustomers,
  ApiCreateCustomer,
  ApiCustomerDetail,
  ApiUpdateCustomer,
  ApiDeleteCustomer,
  ApiImportCustomers,
  ApiExportCsv,
  ApiExportXlsx,
} from './swagger';
import { CustomersService } from './customers.service';
import { Auth } from '../common/decorators/auth.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import {
  CreateCustomerDto,
  CreateCustomerSchema,
  UpdateCustomerDto,
  UpdateCustomerSchema,
  ListCustomersQueryDto,
  ListCustomersQuerySchema,
} from './dtos/customer.dto';

@ApiTags('Customers')
@ApiBearerAuth('JWT-auth')
@Controller('customers')
@Auth(RolesGuard)
export class CustomersController {
  constructor(private svc: CustomersService) {}

  @Get()
  @ApiListCustomers()
  @ListCustomersQueries()
  list(
    @Query(new ZodValidationPipe(ListCustomersQuerySchema))
    query: ListCustomersQueryDto,
  ) {
    return this.svc.list(query);
  }

  @Post()
  @ApiCreateCustomer()
  @Roles('ADMIN', 'STAFF')
  create(
    @Body(new ZodValidationPipe(CreateCustomerSchema))
    data: CreateCustomerDto,
  ) {
    return this.svc.create(data);
  }

  @Get(':id')
  @ApiCustomerDetail()
  findById(@Param('id') id: string) {
    return this.svc.findById(id);
  }

  @Patch(':id')
  @ApiUpdateCustomer()
  @Roles('ADMIN', 'STAFF')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateCustomerSchema))
    data: UpdateCustomerDto,
  ) {
    return this.svc.update(id, data);
  }

  @Delete(':id')
  @ApiDeleteCustomer()
  @Roles('ADMIN')
  delete(@Param('id') id: string) {
    return this.svc.delete(id);
  }

  @Post('import')
  @ApiImportCustomers()
  @Roles('ADMIN', 'STAFF')
  @UseInterceptors(FileInterceptor('file'))
  import(@UploadedFile() file: Express.Multer.File) {
    return this.svc.importFile(file);
  }

  @Get('export.csv')
  @ApiExportCsv()
  @Roles('ADMIN', 'STAFF')
  async exportCsv(@Res() res: Response) {
    const { filename, contentType, data } = await this.svc.exportCsv();
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.send(data);
  }

  @Get('export.xlsx')
  @ApiExportXlsx()
  @Roles('ADMIN', 'STAFF')
  async exportXlsx(@Res() res: Response) {
    const { filename, contentType, data } = await this.svc.exportXlsx();
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.send(data);
  }
}
