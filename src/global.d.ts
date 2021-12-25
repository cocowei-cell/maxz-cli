import { Request } from 'express';

export type InfoRequest = Request & { tokenInfo: any };
