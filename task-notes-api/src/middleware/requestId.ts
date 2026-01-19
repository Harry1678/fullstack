import { randomUUID } from 'crypto';

export function requestId(req: any, _res: any, next: any) {
  req.requestId = randomUUID();
  next();
}
