import { Inject, Injectable, NotFoundException} from "@nestjs/common";
import { School, SchoolRequest } from "src/utiles/schoolsTypes";
import { TeacherService } from "../teachers/teachers.service";


@Injectable()
export class SchoolsService{
    constructor(@Inject() private readonly teacherService:TeacherService){}

    Schools:Array<School> = [
        {id:1,name:"School 1",desc:"desc School 1",teachers:[1,2,3]},
        {id:2,name:"School 2",desc:"desc School 2",teachers:[2,4]},
        {id:3,name:"School 3",desc:"desc School 3",teachers:[1,2,3,4]},
        {id:4,name:"School 4",desc:"desc School 4",teachers:[2,3,4]}];
        
    getSchools(){
        const schoolsList = this.Schools.map(school=>{
            return {...school,teachers:school.teachers.map(teacherId=>this.teacherService.getTeacher(teacherId).name)}//teachers:this.teacherService.getTeachers().filter(teacher=>school.teachers.includes(teacher.id))
        });
        return schoolsList;
    }

    getAnalytics(){
        const leastTeacher = this.Schools.reduce((prev,cur)=>prev.teachers.length<=cur.teachers.length?prev:cur);
        const mostTeacher = this.Schools.reduce((prev,cur)=>prev.teachers.length>=cur.teachers.length?prev:cur);
        return {schoolWithLeastTeacher:leastTeacher.name,schoolWithMostTeacher:mostTeacher.name};
    }

    getSchoolById(id:number):School{
        const proj = this.Schools.find(p=>p.id===id);
        if(!proj){
            throw new NotFoundException(`School with id ${id} not found`);
        }
        return proj;
    }

    addSchool(projInfo:SchoolRequest):School{
        const newId = this.Schools.length !==0 ? this.Schools[this.Schools.length - 1].id + 1: 0 
        const newSchool = {id:newId,...projInfo}
         this.Schools.push(newSchool);
        return newSchool;
    }

    updateSchool(id:number , data:SchoolRequest){
        const indx = this.getIndex(id);
        if(indx !== -1){
            this.Schools[indx] = {...this.Schools[indx],...data};
            return this.Schools[indx]
        }
        throw new NotFoundException(`School with id ${id} not found`)
    }

    deleteProjct(id:number){
        const index = this.getIndex(id);
        if(index !== -1){
            const deletedSchool = this.Schools[index];
            this.Schools.splice(index,1);
            return deletedSchool;
        }
        throw new NotFoundException(`School with id ${id} not found`)
        
    }
    
     getIndex(id:number) {
        return this.Schools.findIndex(School=>School.id === id);
    }
}
