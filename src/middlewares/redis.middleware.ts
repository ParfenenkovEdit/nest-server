const redis = require("redis");
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express'; 

const client = redis.createClient({
    port      : 6379,
    host      : 'redis'
});

@Injectable()
export class RedisMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const { path } = req;
        client.set('path', path, (err, reply) => {
            if (err) throw err;
            console.log(reply);
        });

        client.get('path', (err, reply) => {
            if (err) throw err;
            console.log(reply);
        });

        next();
    }
}
