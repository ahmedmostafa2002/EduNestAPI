import { Module } from "@nestjs/common";
import { EmployeeController } from "./employees.controller";
import { EmployeeService } from "./employees.service";
import { ProjectsModule } from "../projects/projects.module";

@Module({
    imports:[ProjectsModule],
    controllers:[EmployeeController],
    providers:[EmployeeService]
})
export class StudentsModule{}