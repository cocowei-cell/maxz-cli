import { NET_CONFIG } from './../config/index';
import { createWriteStream } from 'fs-extra';
import { join } from 'path';

export const uploadFile = (file, projectName): Promise<any> =>
  new Promise((resolve, reject) => {
    const name = file.originalname as string;
    const dir = join(__dirname, '../project');
    const stream = createWriteStream(join(dir, name));
    const url = `${NET_CONFIG.url}:${NET_CONFIG.port}/project/${name}`;
    stream.write(file.buffer, err => {
      if (err) {
        reject(err);
      } else {
        resolve({
          name,
          url,
        });
      }
    });
  });
