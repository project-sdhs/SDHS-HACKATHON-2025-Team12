import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const VALID_JOBS = [
  'ai-engineer',
  'app-android',
  'app-ios',
  'cyber-security',
  'server-engineer',
  'web-back',
  'web-front',
];

const VALID_PERIODS = ['1', '3', '6'];

@Injectable()
export class RoadmapService {
  getMarkdown(period: string, job: string): string {
    if (!VALID_PERIODS.includes(period)) {
      throw new BadRequestException(`Invalid period: ${period}`);
    }

    if (!VALID_JOBS.includes(job)) {
      throw new BadRequestException(`Invalid job: ${job}`);
    }

    const fileName = `${period}-${job}.md`;
    const filePath = path.join(process.cwd(), 'roadmap_file', fileName);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException(`File not found: ${fileName}`);
    }

    return fs.readFileSync(filePath, 'utf-8');
  }
}
