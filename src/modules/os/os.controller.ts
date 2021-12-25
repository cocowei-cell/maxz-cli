import { Body, Controller, Post, Query, Get } from '@nestjs/common';
import { OsService } from './os.service';

@Controller('os')
export class OsController {
  constructor(private readonly osService: OsService) {}
  // 查询某个端口是否被占用
  @Get('get-port')
  async getPort(@Query() query: { port: number }) {
    const data = await this.osService.getPort(query);
    return data;
  }
}
