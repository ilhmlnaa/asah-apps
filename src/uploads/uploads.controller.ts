import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { ApiImageUpload } from './swagger';

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private svc: UploadsService) {}

  @Post('image')
  @ApiImageUpload()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const res = await this.svc.uploadBuffer(file.buffer);
    return { url: res.secure_url, publicId: res.public_id };
  }
}
