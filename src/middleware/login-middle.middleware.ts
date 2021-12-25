import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { InfoRequest } from 'src/global';
import { checkToken } from 'src/utils';

@Injectable()
export class LoginMiddleMiddleware implements NestMiddleware {
  use(req: InfoRequest, res: Response, next: () => void) {
    const token = req.headers.token as string;
    checkToken(token)
      .then(value => {
        req.tokenInfo = value;
        next();
      })
      .catch(_ => {
        res.send({
          msg: 'token不合法或过期',
          code: -1,
          data: null,
        });
      });
  }
}
