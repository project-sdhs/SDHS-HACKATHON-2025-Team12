import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './decorator/user.decorator';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { UserProfileDto } from './dto/user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UpdateUserCompanyStatusDto } from './dto/update-user-company-status.dto';
import { UpdateSkillsDto } from './dto/update-skills.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async getUserProfile(@User() user: UserEntity): Promise<UserProfileDto> {
    return {
      id: user.id,
      name: user.name,
      category: user.category,
      createdAt: user.createdAt,
    };
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getPersonalUser(@Param('id') id: string) {
    return await this.userService.getPersonalUserData(id);
  }

  @Get('/profile/personal')
  @UseGuards(JwtAuthGuard)
  async getUserProfileExists(@User() user: UserEntity) {
    return await this.userService.getUserPersonalProfile(user.id);
  }

  @Patch('/profile/update')
  @UseGuards(JwtAuthGuard)
  async updateUserProfile(
    @User() user: UserEntity,
    @Body() updateUserDto: UpdateUserProfileDto,
  ) {
    return await this.userService.updateUserProfile(user.id, updateUserDto);
  }

  @Patch('/profile/update-status')
  @UseGuards(JwtAuthGuard)
  async updateUserProfileStatus(
    @User() user: UserEntity,
    @Body() body: UpdateUserCompanyStatusDto,
  ) {
    return await this.userService.updateUserCompanyStatus(user.id, body);
  }

  @Patch('/profile/update-skills')
  @UseGuards(JwtAuthGuard)
  async updateUserProfileSkills(
    @User() user: UserEntity,
    @Body() body: UpdateSkillsDto,
  ) {
    return await this.userService.updateUserSkillsStatus(user.id, body);
  }

  @Patch('/profile/update-exp')
  @UseGuards(JwtAuthGuard)
  async updateUserExperience(
    @User() user: UserEntity,
    @Body() body: UpdateExperienceDto,
  ) {
    return await this.userService.updateUserExperience(user.id, body);
  }
}
