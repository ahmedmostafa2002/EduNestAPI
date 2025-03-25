import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { SchoolsService } from "./schools.service";
import { ApiResponse } from "@nestjs/swagger";
import { School, SchoolAnalytics, SchoolRequest, SchoolUpdateRequest } from "src/utiles/schoolsTypes";

@Controller('/Schools')
export class SchoolsController{
constructor(private readonly SchoolsService:SchoolsService){}

    @Get("/")
    @ApiResponse({
        type:School,
        isArray:true
    })
    getSchools(){
        return this.SchoolsService.getSchools();
    }

    @Get("/analytics")
    @ApiResponse({
        type:SchoolAnalytics
    })
    getAnalytics(){
        return this.SchoolsService.getAnalytics();
    }

    @Get('/:id')
    @ApiResponse({
        type:School
    })
    getSchoolById(@Param("id", ParseIntPipe) id:number){
        return this.SchoolsService.getSchoolById(id);
    }

    @Post("/")
    @ApiResponse({
        type:School
    })
    addSchool(@Body() info:SchoolRequest){
        return this.SchoolsService.addSchool(info)
    }
    @Put("/:id")
    @ApiResponse({
        type:School
    })
    updateSchool(@Param("id", ParseIntPipe)id:number, @Body() newData:SchoolUpdateRequest){
        return this.SchoolsService.updateSchool(id,newData);
    }

    @Delete("/:id")
    @ApiResponse({
        type:School
    })
    deleteSchool(@Param("id",ParseIntPipe) id:number){
        return this.SchoolsService.deleteProjct(id);
    }
}