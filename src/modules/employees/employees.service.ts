import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Employee, EmployeeRequest, EmployeeUpdateRequest } from "src/utiles/emplyeeInterface";
import { ProjectsService } from "../projects/projects.service";

@Injectable()
export class EmployeeService{
    constructor(@Inject() private readonly projectsService:ProjectsService ){}

    employees:Employee[] = [
        {
            id:1,
            name:"Ahmed",
            age:42,
            salary:10000,
            projects:[1,2]
        },
        {
            id:2,
            name:"Mohamed",
            age:34,
            salary:9500,
            projects:[1]
        },
        {
            id:3,
            name:"Omnia",
            age:22,
            salary:4000,
            projects:[3,4]
        },
        {
            id:4,
            name:"Emad",
            age:44,
            salary:14000,
            projects:[5]
        },

    ]
    
    getEmplyees(){
        return this.employees;
    }

    getEmployee(id:number){
        const employee = this.employees.find(employee=>employee.id === id);
        if(!employee)
            throw new NotFoundException()
         return employee;   
    }
    getHighstPaid(){
        return this.employees.reduce((prev,curr)=>prev.salary >= curr.salary ? prev : curr);
    }

    addEmployee(emp:EmployeeRequest){
        let newId = this.employees.length === 0 ? 1 : this.employees[this.employees.length -1].id + 1;
        const newEmployee:Employee = {
            id:newId,
            name:emp.name,
            age:emp.age,
            salary:emp.salary,
            projects:[]
        }
        this.employees.push(newEmployee);
        return newEmployee;
    }

    updateEmployee(id:number , data:EmployeeUpdateRequest){
        const empIndx = this.employees.findIndex(emp => emp.id === id);
        if(empIndx !== -1 ){
            this.employees[empIndx] = {...this.employees[empIndx] ,...data};
            return this.employees[empIndx];
        }else 
        throw new NotFoundException(`Employee with id:${id} doesn't exist`);
    }

    deleteEmployee(id:number){
        const empIndx = this.employees.findIndex(emp => emp.id === id);
        if(empIndx !== -1){
            const deletedEmp = this.employees[empIndx];
            this.employees.splice(empIndx,1);
            return deletedEmp;
        }else
        throw new NotFoundException(`Employee with id:${id} doesn't exist`);
    }
}