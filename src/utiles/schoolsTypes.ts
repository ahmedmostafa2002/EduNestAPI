import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class SchoolRequest{
    @ApiProperty()
    @IsNotEmpty({message:"name is required"})
    name:string;
    @ApiProperty()
    @IsNotEmpty({message:"desc is required"})
    desc:string;
    @ApiProperty()
    teachers:number[];
}

export class School extends SchoolRequest{
    @ApiProperty()
    id:number;
}

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

export class SchoolAnalytics{
    @ApiProperty()
    schoolWithLeastTeacher:string;
    @ApiProperty()
    schoolWithMostTeacher:string;
}