import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, Min, MinLength } from "class-validator";

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