import type { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

type LogFormat = 'simples' | 'completo';

export default function logger(format: LogFormat, logDir: string) {
  const logsDir = path.resolve(process.cwd(), logDir);

  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  return (req: Request, res: Response, next: NextFunction) => {
    const data = [new Date().toISOString(), req.url, req.method];

    if (format === 'completo') {
      data.push(req.httpVersion, req.get('User-Agent') ?? '');
    }

    fs.appendFileSync(path.join(logsDir, 'access.log'), `${data.join(' | ')}\n`);

    next();
  };
}
