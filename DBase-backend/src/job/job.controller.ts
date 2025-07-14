import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { JobService } from './job.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { Request, Response } from 'express';
import { UpdateCompanyDto } from './dto/update-company.dto';
import * as path from 'path';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post('/input')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'file',
          maxCount: 1,
        },
      ],
      {
        storage: diskStorage({
          destination: function (req: Request, file, cb) {
            const dir = `./uploads/temp`;
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, {
                recursive: true,
              });
            }
            cb(null, dir);
          },
          filename: function (req: Request, file, cb) {
            const timestampedName = `${Date.now()}-${req.query.fileName}`;
            file.originalname = timestampedName;
            cb(null, timestampedName);
          },
        }),
      },
    ),
  )
  async inputJob(
    @UploadedFiles() files: { file: Express.Multer.File[] },
    @Res() res: Response,
  ) {
    const savedFile = files.file?.[0];

    if (!savedFile) {
      throw new Error('PDF 파일이 업로드되지 않았습니다.');
    }

    const result = await this.jobService.sendFile(savedFile.originalname); // 인공지능 서버에 파일 전송
    fs.unlinkSync(path.join('uploads', 'temp', savedFile.originalname));
    res.status(201).json(result); // 결과를 클라이언트에 반환
  }

  @Patch('/input/update')
  async updateCompany(@Body() body: UpdateCompanyDto) {
    return this.jobService.updateCompanyAndJob(body);
  }

  @Get()
  async getJobs() {
    return this.jobService.findAll();
  }

  @Get('/company')
  async getCompany(@Req() req: Request) {
    const id: number = Number(req.query.id);

    return this.jobService.findCompany(id);
  }

  @Get('/company/pin')
  async getPinnedCompany(@Req() req: Request) {
    const id: number = Number(req.query.id);

    return this.jobService.findPinnedCompany(id);
  }

  @Get('/company/employed')
  async getAllEmployedStatus() {
    return this.jobService.findAllEmployedStatus();
  }
}
