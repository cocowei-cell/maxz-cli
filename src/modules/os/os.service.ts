import { Injectable } from '@nestjs/common';

@Injectable()
export class OsService {
  async getPort({ port }) {
    // 查询是否可用
  }
}
