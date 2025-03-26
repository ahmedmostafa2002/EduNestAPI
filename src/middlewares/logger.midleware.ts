
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.table({
        path:req.path,
        method:req.method,
        time:new Date().toLocaleTimeString(),
        body:req.body,
    });
    next();
  }
}
