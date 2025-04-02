import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class SchoolUpdateRequest{
    @ApiProperty()
    @IsOptional()
    name:string;
    @ApiProperty()
    @IsOptional()
    desc:string;
    @ApiProperty()
    @IsOptional()
    teachers:number[];
}