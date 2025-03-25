import {Injectable, NotFoundException } from "@nestjs/common";
import { Teacher, TeacherRequest, TeacherUpdateRequest } from "src/utiles/teacherTypes";

@Injectable()
export class TeacherService{

    Teachers:Teacher[] = [
        {
            id:1,
            name:"Ahmed",
            age:42,
            salary:10000
        },
        {
            id:2,
            name:"Mohamed",
            age:34,
            salary:9500
        },
        {
            id:3,
            name:"Omnia",
            age:22,
            salary:4000
        },
        {
            id:4,
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

    addTeacher(emp:TeacherRequest){
        let newId = this.Teachers.length === 0 ? 1 : this.Teachers[this.Teachers.length -1].id + 1;
        const newTeacher:Teacher = {
            id:newId,
            name:emp.name,
            age:emp.age,
            salary:emp.salary,
        }
        this.Teachers.push(newTeacher);
        return newTeacher;
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
}