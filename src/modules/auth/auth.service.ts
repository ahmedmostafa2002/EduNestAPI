import { ConflictException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { SignInDto } from "./dtos/signInDto";
import { ConfigService } from "@nestjs/config";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { SignUpDto } from "./dtos/signUpDto";
import { InjectModel } from "@nestjs/mongoose";
import { Teacher } from "src/schemas/teacher.schema";
import { Model } from "mongoose";

@Injectable()
export class AuthService{
    constructor(@InjectModel(Teacher.name) private teacherModel:Model<Teacher>,
    private readonly configService:ConfigService){}
     async signUp(data:SignUpDto){
            const teacher =await this.teacherModel.findOne({email:data.email});
            if(teacher){
                throw new ConflictException(`Email ${data.email} already exists`);
            }
            data.password = bcrypt.hashSync(data.password,10);
            const newTeacher = new this.teacherModel(data);
            newTeacher.save();
            const {password,...teacherInfo} = data;
            return teacherInfo;
        }

    async signIn(dto:SignInDto){
            const teacher =await this.teacherModel.findOne({email:dto.email}).select({
                email:true,
                password:true
            });
            if(!teacher)
                throw new UnauthorizedException("Invalid Credentials");
    
            const isMatch = await bcrypt.compare(dto.password,teacher.password);
            console.log("is matched ",isMatch)
            if(!isMatch)
                throw new UnauthorizedException("Invalid Credentials");
    
            const payload = {
                email:teacher.email
            }
            const token = jwt.sign(payload,
                this.configService.get<string>("JWT_KEY")!,{expiresIn:"1h"});
    
            return {token};
        }
}