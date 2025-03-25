import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsOptional, Min, MinLength } from "class-validator";

export class EmployeeRequest {

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3) 
    name: string;

    @ApiProperty()
    salary: number;

    @ApiProperty()
    @Min(16)
    age: number;

    @ApiProperty()
    projects: number[];
}

export class Employee extends EmployeeRequest {
    @ApiProperty()
    id: number;
}

export class EmployeeUpdateRequest{
   
    @ApiProperty()
    @IsOptional()
    @MinLength(3)
    name: string;

    @ApiProperty()
    @IsOptional()
    salary: number;

    @ApiProperty()
    @IsOptional()
    @Min(16)
    age: number;
}