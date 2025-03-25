import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { ApiResponse } from "@nestjs/swagger";
import { Project, ProjectRequest, ProjectUpdateRequest } from "src/utiles/projectsTypes";

@Controller('/projects')
export class ProjectsController{
constructor(private readonly projectsService:ProjectsService){}

    @Get("/")
    @ApiResponse({
        type:Project,
        isArray:true
    })
    getProjects(){
        return this.projectsService.getProjects();
    }

    @Get('/:id')
    @ApiResponse({
        type:Project
    })
    getProjectById(@Param("id", ParseIntPipe) id:number){
        return this.projectsService.getProjectById(id);
    }

    @Post("/")
    @ApiResponse({
        type:Project
    })
    addProject(@Body() info:ProjectRequest){
        return this.projectsService.addProject(info)
    }
    @Put("/:id")
    @ApiResponse({
        type:Project
    })
    updateProject(@Param("id", ParseIntPipe)id:number, @Body() newData:ProjectUpdateRequest){
        return this.projectsService.updateProject(id,newData);
    }

    @Delete("/:id")
    @ApiResponse({
        type:Project
    })
    deleteProject(@Param("id",ParseIntPipe) id:number){
        return this.projectsService.deleteProjct(id);
    }
}