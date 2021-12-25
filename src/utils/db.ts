import * as mongoose from 'mongoose';
import { MongoDbConfig } from 'src/config';

export const connectMongoDb = () => {
  mongoose
    .connect(
      `mongodb://${MongoDbConfig.user}:${MongoDbConfig.password}@${MongoDbConfig.url}:${MongoDbConfig.port}/${MongoDbConfig.dbName}`
    )
    .then(() => console.log('Database connection successful'))
    .catch(() => console.log('Database connection failed'));
};
