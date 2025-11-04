import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Auth } from '../common/decorators/auth.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import {
  UpdateUserDto,
  UpdateUserSchema,
  UserListQueryDto,
  UserListQuerySchema,
} from './dtos/user.dto';
import {
  ApiUsersList,
  ApiUserDetail,
  ApiUpdateUser,
  ApiDeleteUser,
} from './swagger';

@ApiTags('Users Management')
@ApiBearerAuth('JWT-auth')
@Controller('users')
@Auth(RolesGuard)
@Roles('ADMIN')
export class UsersController {
  constructor(private svc: UsersService) {}

  @Get()
  @ApiUsersList()
  @UsePipes(new ZodValidationPipe(UserListQuerySchema))
  list(@Query() query: UserListQueryDto) {
    return this.svc.list(query);
  }

  @Get(':id')
  @ApiUserDetail()
  detail(@Param('id') id: string) {
    return this.svc.detail(id);
  }

  @Patch(':id')
  @ApiUpdateUser()
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateUserSchema)) dto: UpdateUserDto,
  ) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @ApiDeleteUser()
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}
