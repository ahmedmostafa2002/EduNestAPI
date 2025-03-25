import { Body, Controller, Delete, Get, Param, ParseFloatPipe, ParseIntPipe, Post, Put } from "@nestjs/common";
import { EmployeeService } from "./employees.service";
import { ApiResponse } from "@nestjs/swagger";
import { Employee, EmployeeRequest, EmployeeUpdateRequest } from "src/utiles/emplyeeInterface";


@Controller('/employees')
export class EmployeeController{
    constructor(private readonly EmployeeService: EmployeeService){}

    @ApiResponse({
        type: Employee,
        isArray: true
    })
    @Get('/')
    getEmployees(){
        return this.EmployeeService.getEmplyees();
    }
    @ApiResponse({
        type: Employee
    })
    @Get("/highest-paid")
    getHighestPaid(){
        return this.EmployeeService.getHighstPaid();
    }
    @ApiResponse({
        type: Employee
    })
    @Get('/:id')
    getEmployee(@Param("id",ParseIntPipe) id:number){
        return this.EmployeeService.getEmployee(id)
    }


    @ApiResponse({
        type: Employee
    })
    @Post()
    addEmployee(@Body() emp:EmployeeRequest){
        return this.EmployeeService.addEmployee(emp);
    }

    @ApiResponse({
        type: Employee
    })
    @Put("/:id")
    updateEmployee(@Param("id",ParseFloatPipe) id:number ,
     @Body() data:EmployeeUpdateRequest){
        return this.EmployeeService.updateEmployee(
            id,
            data
        )
    }

    @ApiResponse({
        type: Employee
    })
    @Delete("/:id")
    deleteEmployee(@Param("id",ParseIntPipe) id:number){
        return this.EmployeeService.deleteEmployee(id);
    }
}