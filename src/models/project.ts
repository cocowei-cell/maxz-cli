import * as Mongoose from 'mongoose';
export interface ProjectSchema {
  along: any;
  project_name: any;
  upload_time: any;
  last_build_time: any;
  url: string;
  port: number;
}

const Schema = new Mongoose.Schema(
  {
    along: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    project_name: {
      type: String,
      default: '',
      require: true,
    },
    upload_time: {
      type: String,
      default: '',
      require: false,
    },
    last_build_time: {
      type: String,
      default: '',
      require: false,
    },
    url: {
      type: String,
      default: '',
      require: false,
    },
    port: {
      type: Number,
      default: '',
      require: false,
    },
  },
  { versionKey: false }
);
export const Project = Mongoose.model<Partial<ProjectSchema & { _id: Mongoose.ObjectId }>>('project', Schema);
