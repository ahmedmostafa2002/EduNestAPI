import {BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { Teacher } from "src/schemas/teacher.schema";
import { isValidObjectId, Model } from "mongoose";
import { JPayload } from "src/utiles/payloadJwtInterface";
import { TeacherUpdateRequest } from "./dtos/teacherUpdateReq";

@Injectable()
export class TeacherService{
    constructor(@InjectModel(Teacher.name) private teacherModel:Model<Teacher>,private readonly configService:ConfigService){}
    
    async getTeachers(){
        return await this.teacherModel.find();
    }

    async getTeacher(id:string){
        if (!isValidObjectId(id)) {
            throw new BadRequestException('Invalid ID format');
          }
        const Teacher = await this.teacherModel.findById(id);
        if(!Teacher)
            throw new NotFoundException(`user with id ${id} not exist`)
        const {password , ...restInfo} = Teacher.toObject();
         return restInfo;   
    }
    async getHighstPaid(){
        const highstPaidTeacher = (await this.teacherModel.find()).reduce((prev,cur)=>prev.salary >= cur.salary ? prev:cur);
        const {password,...restInfo} = highstPaidTeacher.toObject();
        return restInfo;
    }

    async updateTeacher(id:string , data:TeacherUpdateRequest){
        if (!isValidObjectId(id)) {
            throw new BadRequestException('Invalid ID format');
          }
        const teacher =await this.teacherModel.findById(id);
        console.log(teacher);
        if(teacher){
            return await this.teacherModel.findByIdAndUpdate(id,data,{new:true,runValidators:true});
        }else 
        throw new NotFoundException(`Teacher with id:${id} doesn't exist`);
    }

    async deleteTeacher(id:string){
        if (!isValidObjectId(id)) {
            throw new BadRequestException('Invalid ID format');
          }
        const teacher = await this.teacherModel.findById(id);
        if(teacher){
            return this.teacherModel.findByIdAndDelete(id);
        }else
        throw new NotFoundException(`Teacher with id:${id} doesn't exist`);
    }

    async getProfile(teacher:JPayload){
        return await this.teacherModel.findOne({email:teacher.email});
    }
} 