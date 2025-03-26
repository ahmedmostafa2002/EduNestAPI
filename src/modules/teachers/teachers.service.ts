import {ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Teacher, TeacherRequest, TeacherSignInRequest, TeacherUpdateRequest } from "src/utiles/teacherTypes";
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TeacherService{
    constructor(private readonly configService:ConfigService){}
    Teachers:Teacher[] = [
        {
            id:1,
            email:"ahmed@gmail.com",
            password:"12345678",
            name:"Ahmed",
            age:42,
            salary:10000
        },
        {
            id:2,
            email:"mohamed@gmail.com",
            password:"12345678",
            name:"Mohamed",
            age:34,
            salary:9500
        },
        {
            id:3,
            email:"omnia@gmail.com",
            password:"12345678",
            name:"Omnia",
            age:22,
            salary:4000
        },
        {
            id:4,
            email:"emad@gmail.com",
            password:"12345678",
            name:"Emad",
            age:44,
            salary:14000
        },

    ]
    
    getTeachers(){
        return this.Teachers;
    }

    getTeacher(id:number){
        const Teacher = this.Teachers.find(Teacher=>Teacher.id === id);
        if(!Teacher)
            throw new NotFoundException()
         return Teacher;   
    }
    getHighstPaid(){
        return this.Teachers.reduce((prev,curr)=>prev.salary >= curr.salary ? prev : curr);
    }

    async addTeacher(emp:TeacherRequest){
        const emailExist = this.Teachers.find(teacher=>teacher.email === emp.email);
        if(emailExist){
            throw new ConflictException(`Email ${emp.email} already exists`);
        }
        let newId = this.Teachers.length === 0 ? 1 : this.Teachers[this.Teachers.length -1].id + 1;
        const hashedPassword =await bcrypt.hash(emp.password,10);
        const newTeacher:Teacher = {
            id:newId,
            name:emp.name,
            email:emp.email,
            password:hashedPassword,
            age:emp.age,
            salary:emp.salary,
        }
        this.Teachers.push(newTeacher);
        const {password,...teacherInfo} = newTeacher;
        return teacherInfo;
    }

    updateTeacher(id:number , data:TeacherUpdateRequest){
        const empIndx = this.Teachers.findIndex(emp => emp.id === id);
        if(empIndx !== -1 ){
            this.Teachers[empIndx] = {...this.Teachers[empIndx] ,...data};
            return this.Teachers[empIndx];
        }else 
        throw new NotFoundException(`Teacher with id:${id} doesn't exist`);
    }

    deleteTeacher(id:number){
        const empIndx = this.Teachers.findIndex(emp => emp.id === id);
        if(empIndx !== -1){
            const deletedEmp = this.Teachers[empIndx];
            this.Teachers.splice(empIndx,1);
            return deletedEmp;
        }else
        throw new NotFoundException(`Teacher with id:${id} doesn't exist`);
    }

    async signIn(dto:TeacherSignInRequest){
        const teacher = this.Teachers.find(teacher=>teacher.email === dto.email);
        console.log("Teacher ",teacher);
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