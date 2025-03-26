import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsOptional, Matches, Min, MinLength } from "class-validator";

export class TeacherRequest {

    @ApiProperty()
    @IsNotEmpty()
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

export class Teacher extends TeacherRequest {
    @ApiProperty()
    id: number;
}


export class TeacherUpdateRequest{
   
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

export class TeacherSignInRequest{
    @ApiProperty()
    email:string;
    @ApiProperty()
    password:string;
}

