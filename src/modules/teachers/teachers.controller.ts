import { Body, Controller, Delete, Get, Param, ParseFloatPipe, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { TeacherService } from "./teachers.service";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { Teacher, TeacherRequest, TeacherSignInRequest, TeacherUpdateRequest } from "src/utiles/teacherTypes";


@Controller('/Teachers')
export class TeacherController{
    constructor(private readonly TeacherService: TeacherService){}

    @ApiResponse({
        type: Teacher,
        isArray: true
    })
    @ApiBearerAuth()
    @Get('/')
    getTeachers(){
        return this.TeacherService.getTeachers();
    }
    @ApiResponse({
        type: Teacher
    })
    @Get("/highest-paid")
    getHighestPaid(){
        return this.TeacherService.getHighstPaid();
    }
    @ApiResponse({
        type: Teacher
    })
    @Get('/:id')
    getTeacher(@Param("id",ParseIntPipe) id:number){
        return this.TeacherService.getTeacher(id)
    }


    @ApiResponse({
        type: Teacher
    })
    @Post()
    addTeacher(@Body() emp:TeacherRequest){
        return this.TeacherService.addTeacher(emp);
    }

    @ApiResponse({
        type: Teacher
    })
    @Put("/:id")
    updateTeacher(@Param("id",ParseFloatPipe) id:number ,
     @Body() data:TeacherUpdateRequest){
        return this.TeacherService.updateTeacher(
            id,
            data
        )
    }

    @ApiResponse({
        type: Teacher
    })
    @Delete("/:id")
    deleteTeacher(@Param("id",ParseIntPipe) id:number){
        return this.TeacherService.deleteTeacher(id);
    }

    @Patch("/")
    @ApiResponse({
        type: String
    })
    login(@Body() data:TeacherSignInRequest){
        return this.TeacherService.signIn(data);
    }
}