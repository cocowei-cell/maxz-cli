import * as Mongoose from 'mongoose';
export interface UserSchema {
  username: string;
  password: string;
}

const Schema = new Mongoose.Schema(
  {
    username: {
      type: String,
      default: '',
      require: true,
    },
    password: {
      type: String,
      default: '',
      require: true,
    },
  },
  { versionKey: false }
);
export const User = Mongoose.model<Partial<UserSchema & { _id: Mongoose.ObjectId }>>('user', Schema);
