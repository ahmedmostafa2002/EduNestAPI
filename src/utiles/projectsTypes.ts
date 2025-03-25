import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class ProjectRequest{
    @ApiProperty()
    @IsNotEmpty({message:"name is required"})
    name:string;
    @ApiProperty()
    @IsNotEmpty({message:"desc is required"})
    desc:string;
}

export class Project extends ProjectRequest{
    @ApiProperty()
    id:number;
}

export class ProjectUpdateRequest{
    @ApiProperty()
    @IsOptional()
    name:string;
    @ApiProperty()
    @IsOptional()
    desc:string;
}