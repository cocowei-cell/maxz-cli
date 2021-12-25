import { NET_CONFIG } from './../config/index';
import { exec, execSync } from 'child_process';
import { join } from 'path';
import { Socket } from 'socket.io';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { zip } from 'compressing';
import { unlinkSync } from 'fs';
import { Project } from 'src/models/project';
@WebSocketGateway()
export class WebsocketGateway {
  @SubscribeMessage('deploy')
  async handleMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    // 开始部署项目
    const { projectName, port } = data;
    const path = join(__dirname, '../', 'project');
    // 解压项目
    try {
      await zip.uncompress(`${path}/${projectName}.zip`, `${path}/${projectName}`).catch(err => {
        console.log(err);
      });
      unlinkSync(join(__dirname, '../project', `${projectName}.zip`));
      const proPath = `${path}/${projectName}`;
      const ex = exec(`/bin/bash ${proPath}/build.sh`);
      ex.stdout.on('data', data => {
        client.emit('data', data);
      });
      ex.stdout.on('end', async () => {
        await Project.updateOne(
          {
            project_name: projectName,
          },
          {
            $set: {
              last_build_time: `${Date.now()}`,
            },
          }
        );
        client.emit('end', `${projectName}部署成功！\n项目地址为:${NET_CONFIG.url}:${port}`);
      });
      ex.stdout.on('error', err => {
        client.emit('err', err.message);
      });
      ex.on('error', err => {
        client.emit('err', err.message);
      });
    } catch (error) {
      client.emit('err', '部署失败！');
    }
  }
}
