import { Response } from 'express';
import { InfoRequest } from 'src/global';
import { checkToken } from 'src/utils';

export const FileMiddleware = async (req: InfoRequest, res: Response, next: () => void) => {
  // 校验该文件是否是该用户的，必须登录后才能下载该文件
  const token = req.headers.token as string;
  const fileName = req.path;
  if (fileName.includes('/project/')) {
    // 只有是project才校验，其他的文件比如favicon则不进行校验
    // const value = await checkToken(token).catch(() => {
    //   res.send({
    //     msg: 'token不合法',
    //     data: null,
    //     code: -1,
    //   });
    // });
    // if(!value) return;
    // console.log(12312);
    next()
  } else {
    next();
  }
};
