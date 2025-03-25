import { Injectable, NotFoundException} from "@nestjs/common";
import { Project, ProjectRequest } from "src/utiles/projectsTypes";

@Injectable()
export class ProjectsService{
    projects:Array<Project> = [
        {id:1,name:"Project 1",desc:"descr for proj1"},
        {id:2,name:"Project 2",desc:"descr for proj2"},
        {id:3,name:"Project 3",desc:"descr for proj3"},
        {id:4,name:"Project 4",desc:"descr for proj4"},
        {id:5,name:"Project 5",desc:"descr for proj5"}];
        
    getProjects():Array<Project>{
        return this.projects;
    }
    
    getProjectById(id:number):Project{
        const proj = this.projects.find(p=>p.id===id);
        if(!proj){
            throw new NotFoundException(`Project with id ${id} not found`);
        }
        return proj;
    }

    addProject(projInfo:ProjectRequest):Project{
        const newId = this.projects.length !==0 ? this.projects[this.projects.length - 1].id + 1: 0 
        const newProject = {id:newId,...projInfo}
         this.projects.push(newProject);
        return newProject;
    }

    updateProject(id:number , data:ProjectRequest){
        const indx = this.getIndex(id);
        if(indx !== -1){
            this.projects[indx] = {...this.projects[indx],...data};
            return this.projects[indx]
        }
        throw new NotFoundException(`Project with id ${id} not found`)
    }

    deleteProjct(id:number){
        const index = this.getIndex(id);
        if(index !== -1){
            const deletedProject = this.projects[index];
            this.projects.splice(index,1);
            return deletedProject;
        }
        throw new NotFoundException(`Project with id ${id} not found`)
        
    }
    
     getIndex(id:number) {
        return this.projects.findIndex(project=>project.id === id);
    }
}
