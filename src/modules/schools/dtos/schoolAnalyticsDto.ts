import { ApiProperty } from "@nestjs/swagger";

export class SchoolAnalytics{
    @ApiProperty()
    schoolWithLeastTeacher:string;
    @ApiProperty()
    schoolWithMostTeacher:string;
}