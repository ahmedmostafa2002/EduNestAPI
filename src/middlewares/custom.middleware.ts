import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class CustomHeaderMiddleware implements NestMiddleware{
    constructor(private readonly configService:ConfigService){}

    use(req: Request, res: Response, next: NextFunction) {
        // console.log(req.headers)
        const custom_header = req.headers["custom-header"];
        if(!custom_header){
            console.log("custom-header not exist in the headers")
        }else{
            if(custom_header !== this.configService.get<string>("custom-header")){
                console.log ("the value in custom-header not equal to custom-header in .env")
            }else{
                console.log( "custom-header has the same value in .env");
            }
        }


        next();
        
    }
}