import { UserLoginDto, UserRegisterDto } from './dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('login')
  async login(@Body() body: UserLoginDto) {
    const data = await this.userService.login(body);
    return data;
  }

  @Post('validate')
  async validate(@Body('username') username: string) {
    const data = await this.userService.validate(username);
    return data;
  }

  @Post('register')
  async register(@Body() body: UserRegisterDto) {
    const data = await this.userService.register(body);
    return data;
  }

  // @Post('check-login')
  // async checkIslogin() {
  // }
}
