import { Body, Controller, Delete, Get, Param, Put } from "@nestjs/common";
import { SchoolsService } from "./schools.service";
import { ApiResponse } from "@nestjs/swagger";
import { SchoolDto } from "./dtos/schoolDto";
import { SchoolAnalytics } from "./dtos/schoolAnalyticsDto";
import { SchoolUpdateRequest } from "./dtos/schoolUpdateReq";

@Controller('/Schools')
export class SchoolsController{
constructor(private readonly SchoolsService:SchoolsService){}

    @Get("/")
    @ApiResponse({
        type:SchoolDto,
        isArray:true
    })
    async getSchools(){
        return await this.SchoolsService.getSchools();
    }

    @Get("/analytics")
    @ApiResponse({
        type:SchoolAnalytics
    })
    async getAnalytics(){
        return await this.SchoolsService.getAnalytics();
    }

    @Get('/:id')
    @ApiResponse({
        type:SchoolDto
    })
    async getSchoolById(@Param("id") id:string){
        return await this.SchoolsService.getSchoolById(id);
    }
    @Put("/:id")
    @ApiResponse({
        type:SchoolDto
    })
    async updateSchool(@Param("id")id:string, @Body() newData:SchoolUpdateRequest){
        return await this.SchoolsService.updateSchool(id,newData);
    }

    @Delete("/:id")
    @ApiResponse({
        type:SchoolDto
    })
    async deleteSchool(@Param("id") id:string){
        return await this.SchoolsService.deleteProjct(id);
    }
}