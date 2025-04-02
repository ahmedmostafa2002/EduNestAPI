import { Body, Controller, Delete, Get, Param, Put, Req } from "@nestjs/common";
import { TeacherService } from "./teachers.service";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { Request } from "express";
import { TeacherDto } from "./dtos/teacherDto";
import { TeacherUpdateRequest } from "./dtos/teacherUpdateReq";

@Controller('/Teachers')
@ApiBearerAuth()
export class TeacherController{
    constructor(private readonly TeacherService: TeacherService){}

    @ApiResponse({
        type: TeacherDto,
        isArray: true
    })
    @Get('/')
    getTeachers(){
        return this.TeacherService.getTeachers();
    }
    @ApiResponse({
        type: TeacherDto
    })
    @Get("/highest-paid")
    getHighestPaid(){
        return this.TeacherService.getHighstPaid();
    }
    @Get("/profile")
    async GetProfile(@Req() req:Request){
        return await this.TeacherService.getProfile(req["teacher"]);
    }

    @ApiResponse({
        type: TeacherDto
    })
    @Get('/:id')
    getTeacher(@Param("id") id:string){
        return this.TeacherService.getTeacher(id)
    }

    @ApiResponse({
        type: TeacherDto
    })
    @Put("/:id")
    updateTeacher(@Param("id") id:string ,
     @Body() data:TeacherUpdateRequest){
        return this.TeacherService.updateTeacher(
            id,
            data
        )
    }
    @ApiResponse({
        type: TeacherDto
    })
    @Delete("/:id")
    deleteTeacher(@Param("id") id:string){
        return this.TeacherService.deleteTeacher(id);
    }

}