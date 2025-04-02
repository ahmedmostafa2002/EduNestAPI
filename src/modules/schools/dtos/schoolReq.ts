import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty} from "class-validator";

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