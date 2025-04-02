import { ApiProperty } from "@nestjs/swagger";
import { SchoolRequest } from "./schoolReq";

export class SchoolDto extends SchoolRequest{
    @ApiProperty()
    id:number;
}
