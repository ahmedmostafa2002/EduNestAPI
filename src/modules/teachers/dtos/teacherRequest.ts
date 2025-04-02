import { ApiProperty } from "@nestjs/swagger";
import {Matches, Min, MinLength } from "class-validator";

export class TeacherRequest {

    @ApiProperty()
    @MinLength(3) 
    name: string;
    @ApiProperty()
    @Matches(/^[a-zA-Z0-9]+@gmail.com$/)
    email:string;
    @ApiProperty()
    @MinLength(8)
    password:string;
    @ApiProperty()
    salary: number;

    @ApiProperty()
    @Min(24)
    age: number;

}