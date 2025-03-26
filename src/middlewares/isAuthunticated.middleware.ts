import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

@Injectable()
export class IsAuthenticatedMiddleware implements NestMiddleware{
    constructor(private readonly configservice:ConfigService){}
    use(req: Request, res: Response, next: NextFunction) {
        const berearToken = req.headers["authorization"];
        if(!berearToken)
            throw new UnauthorizedException("You can't access this data");

        const token = berearToken.split(" ")[1];

        if(!token)
            throw new UnauthorizedException()

        try{
            jwt.verify(token,this.configservice.get<string>("JWT_KEY")!);
        }catch(err){
            throw new UnauthorizedException()
        }
        next();
    }
}