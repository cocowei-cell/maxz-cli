import { ProjectCloseDto, ProjectCreateDto, ProjectDeployDto } from './dto';
import { Body, Controller, Post, Query, Get, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProjectService } from './project.service';
import { InfoRequest } from 'src/global';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Post('create')
  async createProject(@Body() body: ProjectCreateDto, @Req() req: InfoRequest) {
    const data = await this.projectService.createProject(body, req.tokenInfo);
    return data;
  }

  @UseInterceptors(AnyFilesInterceptor())
  @Post('deploy')
  async deployProject(@UploadedFiles() files: [], @Body() body: ProjectDeployDto) {
    const data = await this.projectService.deployProject(files, body);
    return data;
  }

  @Post('check-project')
  async checkProject(@Body() body: { projectName: string }) {
    const data = await this.projectService.checkProject(body.projectName);
    return data;
  }

  @Get('list')
  async listProject(@Query() query: { projectName?: string }, @Req() req: InfoRequest) {
    const data = await this.projectService.listProject(query.projectName, req.tokenInfo);
    return data;
  }
}
