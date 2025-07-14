import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApplyService } from './apply.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import * as fs from 'fs';
import * as archiver from 'archiver';

@Controller('apply')
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @Post('/input')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'resumeAndCoverLetter',
          maxCount: 1,
        },
        {
          name: 'portfolio',
          maxCount: 1,
        },
        {
          name: 'etcFile',
          maxCount: 3,
        },
      ],
      {
        storage: diskStorage({
          destination: `./uploads/temp`,
          filename: (req, file, cb) => {
            // 한글 파일명 인코딩 문제 해결
            const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
            const timestamp = Date.now();
            const extension = originalName.split('.').pop();
            const nameWithoutExt = originalName.replace(`.${extension}`, '');
            const safeFileName = `${timestamp}-${nameWithoutExt}.${extension}`;
            cb(null, safeFileName);
          },
        }),
      },
    ),
  )
  async postApply(
    @UploadedFiles()
    files: {
      resumeAndCoverLetter: Express.Multer.File;
      portfolio: Express.Multer.File;
      etcFile: Express.Multer.File[];
    },
    @Body() body: { companyId: string },
    @Req() req: Request,
  ) {
    return await this.applyService.inputApply(files, body, req);
  }

  @Get('/status')
  @UseGuards(JwtAuthGuard)
  async getApplicationStatus(@Req() req: Request) {
    return this.applyService.getApplicationStatus(req);
  }

  @Get('/download/:applicationId')
  @UseGuards(JwtAuthGuard)
  async downloadApplicationFiles(
    @Param('applicationId') applicationId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const files = await this.applyService.downloadApplicationFiles(
        Number(applicationId),
        req,
      );

      if (files.length === 0) {
        return res.status(404).json({ message: '다운로드할 파일이 없습니다.' });
      }

      // ZIP 파일 생성
      const archive = archiver('zip', {
        zlib: { level: 9 } // 최대 압축 레벨
      });

      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent('지원서류.zip')}`);

      archive.pipe(res);

      // 각 파일을 ZIP에 추가
      files.forEach((file) => {
        if (fs.existsSync(file.path)) {
          archive.file(file.path, { name: file.filename });
        }
      });

      await archive.finalize();

    } catch (error) {
      console.error('다운로드 에러:', error);
      res.status(500).json({ message: error.message || '다운로드 중 오류가 발생했습니다.' });
    }
  }

  @Put('/status/:applicationId')
  @UseGuards(JwtAuthGuard)
  async updateApplicationStatus(
    @Param('applicationId') applicationId: string,
    @Body() body: { status: string; feedback?: string },
  ) {
    return this.applyService.updateApplicationStatus(
      Number(applicationId),
      body.status,
      body.feedback,
    );
  }
}
