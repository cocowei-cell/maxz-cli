import { checkPort } from './../../utils/check-port';
import { join, resolve } from 'path';
import { uploadFile } from './../../utils/upload';
import { ProjectCreateDto, ProjectDeployDto, ProjectCloseDto } from './dto';
import { Injectable } from '@nestjs/common';
import { Project } from 'src/models/project';
import * as fs from 'fs';
import { exec, execSync } from 'child_process';
@Injectable()
export class ProjectService {
  async createProject(info: ProjectCreateDto, userInfo) {
    const tag = await Project.findOne({
      project_name: info.projectName,
    });
    if (tag) {
      return -1;
    }
    await Project.create({
      project_name: info.projectName,
      along: userInfo._id,
    });
    return 1;
  }

  async deployProject(files: any[], info: ProjectDeployDto) {
    const { projectName, port } = info; // 项目名称
    const isPortCanUse = await checkPort(port);
    if (isPortCanUse) {
      exec(`/bin/bash ${join(__dirname, '../../', 'port.sh')} ${port}`).stdout.on('data', () => {
        console.log(`kill ${port}`);
      });
    }
    try {
      fs.mkdirSync(join(__dirname, '../../', 'project')); // 目的是为了创建project文件夹
    } catch (error) {}
    // 删除目录下的文件夹
    try {
      execSync(`rm -rf ${join(__dirname, '../../', 'project', projectName)}`);
    } catch (error) {}
    await Promise.all(files.map(file => uploadFile(file, projectName)));
    await Project.updateOne(
      {
        project_name: projectName,
      },
      {
        $set: {
          upload_time: `${Date.now()}`,
          port,
        },
      }
    );
    return 1;
  }

  async checkProject(projectName) {
    const isExists = fs.existsSync(join(__dirname, '../', '../project', projectName));
    return {
      isExists,
    };
  }

  async listProject(projectName, { _id }) {
    return projectName ?
      [
        await Project.findOne({
          project_name: projectName,
        }),
      ] :
      await Project.find({
        user: _id,
      });
  }
}
