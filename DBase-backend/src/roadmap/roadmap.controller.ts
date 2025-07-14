import { Controller, Get, Query } from '@nestjs/common';
import { RoadmapService } from './roadmap.service';

@Controller('roadmap')
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @Get()
  getRoadmap(@Query('job') job: string, @Query('period') period: string) {
    if (!job || !period) {
      return { error: '희망 직무 또는 목표 기간 누락' };
    }

    const content = this.roadmapService.getMarkdown(period, job);
    return { content };
  }
}
