import * as redisStore from 'cache-manager-redis-store';
// jwt配置文件
export const JWT_CONFIG: { scret: string; expireIn?: number } = {
  scret: 'huikahsdy23yr7823yaskjfh)I(-0(_)ifuaiosjhfihasjkhfjkasfans,fnalksnfman',
  expireIn: 60 * 60 * 24 * 30, // 30天内有效
};
export const HOST = '150.158.58.168';
export const MongoDbConfig: { url: string; user?: string; password?: string; port: number; dbName: string } = {
  url: HOST,
  port: 27017,
  dbName: 'cloud',
  user: 'cloud',
  password: 'zzzjy+1A',
};

export const RedisConf: { store: any; host: string; port: number; password: string; db: number } = {
  store: redisStore,
  host: HOST,
  port: 6379,
  password: 'zzzjy+1A',
  db: 0,
};

export const env = process.env.NODE_ENV;

export const NET_CONFIG: { url: string; port: number } = {
  url: env === 'development' ? 'http://localhost' : `http://${ HOST}`,
  port: 8888,
};

export const MiddlewareConfig: { exclude: any[]; forRoutes: any[] } = {
  exclude: ['/api/user/login', '/api/user/validate', '/api/user/register', '/api/see'],
  forRoutes: ['/'],
};
