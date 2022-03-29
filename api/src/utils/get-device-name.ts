import { Request } from 'express';

export default function getDeviceName(req: Request) {
  if (req.headers['user-agent']) {
    const userAgent = req.headers['user-agent'];
    const parsedHeaders = userAgent.match(/\(([^)]+)\)/);

    if (parsedHeaders) {
      return parsedHeaders[1];
    }

    return userAgent;
  }

  return 'undefined';
}
