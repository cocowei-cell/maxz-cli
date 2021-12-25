// 检查某个端口是否被占用
import * as net from 'net';
export const checkPort = (port: number) => {
  const server = net.createServer().listen(port);
  return new Promise((r) => {
    server.on('listening', function () {
      // 执行这块代码说明端口未被占用
      server.close(); // 关闭服务
      r(false)
    });
    server.on('error', function (err: any) {
      if (err.code === 'EADDRINUSE') {
        // 端口已经被使用
        r(true)
      }
    });
  });
};
