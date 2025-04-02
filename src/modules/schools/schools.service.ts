import { BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {School} from "../../schemas/school.schema";
import { InjectModel } from "@nestjs/mongoose";
import { isValidObjectId, Model } from "mongoose";
import { Teacher } from "src/schemas/teacher.schema";
import { SchoolRequest } from "./dtos/schoolReq";


@Injectable()
export class SchoolsService{
    constructor(@InjectModel(School.name) private schoolModel:Model<School>,
    @InjectModel(Teacher.name) private teacherModel:Model<Teacher>){}
        
     async getSchools(){
        const schools =await Promise.all(
            (await this.schoolModel.find()).map(async(school)=>{
                const teachers = await Promise.all(
                      school.teachers.map((id)=>this.teacherModel.findById(id))
                )
                return {
                    ...school.toObject(),
                    teachers:teachers.map(teacher=>teacher?.toObject().name)
                }
            })
        )
        return schools;
    }

    async getAnalytics(){
        const leastTeacher = (await this.schoolModel.find()).reduce((prev,cur)=>prev.teachers.length<=cur.teachers.length?prev:cur)
        const mostTeacher = (await this.schoolModel.find()).reduce((prev,cur)=>prev.teachers.length>=cur.teachers.length?prev:cur);
        return {schoolWithLeastTeacher:leastTeacher.name,schoolWithMostTeacher:mostTeacher.name};
    }

    async getSchoolById(id:string){
        if(!isValidObjectId(id)){
            throw new BadRequestException('Invalid ID format');
        }

       const school = await this.schoolModel.findById(id);
        if(school){
            const teachers =await Promise.all(
                school.teachers.map(teacherId=>  this.teacherModel.findById(teacherId))
            ) 
            return {...school.toObject() ,teachers:teachers.map(teacher=>teacher?.toObject().name)} 
        }
        throw new NotFoundException(`School with id ${id} not found`);
    }

    async updateSchool(id:string , data:SchoolRequest){
        if(!isValidObjectId(id)){
            throw new BadRequestException('Invalid ID format');
        }
        const school = await this.schoolModel.findById(id);
        if(school){
         await this.schoolModel.findByIdAndUpdate(id,data);
         return await this.schoolModel.findById(id);
        }
        throw new NotFoundException(`School with id ${id} not found`)
    }

    async deleteProjct(id:string){
        if(!isValidObjectId(id)){
            throw new BadRequestException('Invalid ID format');
        };
        const school = await this.schoolModel.findById(id);
        if(school){
            return this.schoolModel.findByIdAndDelete(id);
        }
        throw new NotFoundException(`School with id ${id} not found`)
        
    }
    
}
