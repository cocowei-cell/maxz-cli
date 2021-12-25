import { getToken } from '../../utils/token';
import { User } from '../../models/user';
import { UserLoginDto, UserRegisterDto } from './dto';
import { HttpException, Injectable } from '@nestjs/common';
import { pick } from 'lodash';

@Injectable()
export class UserService {
  async login(info: UserLoginDto) {
    const tag = await User.findOne(info);
    if (tag) {
      return {
        token: getToken({
          ...pick(tag, ['username']),
          _id: tag._id,
        }),
        username: tag.username,
        _id: tag._id,
      };
    } else {
      throw new HttpException('用户名或密码错误', 200);
    }
  }

  async register(info: UserRegisterDto) {
    try {
      await User.create(info);
      return '创建成功！';
    } catch (error) {
      return '创建失败！';
    }
  }

  async validate(username: string) {
    const tag = await User.findOne({
      username,
    });
    return tag ? -1 : 1;
  }
}
