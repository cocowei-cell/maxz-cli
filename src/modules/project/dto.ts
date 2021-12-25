export interface ProjectCreateDto {
  projectName: string;
  _id: string;
}

export interface ProjectDeployDto {
  projectName: string;
  port: number;
  deleteProject: boolean;
}

export interface ProjectCloseDto {
  projectName: string;
  type: 'pm2' | 'nor';
}
