import * as jwt from 'jsonwebtoken';
import { JWT_CONFIG } from 'src/config';
export const getToken = (payload: any): string => jwt.sign(payload, JWT_CONFIG.scret, {
  expiresIn: JWT_CONFIG.expireIn,
});

export const checkToken = (token: string): Promise<any> =>
  new Promise<any>((resolve, reject) => {
    jwt.verify(token, JWT_CONFIG.scret, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
