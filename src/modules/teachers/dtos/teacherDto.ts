import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";
import { TeacherRequest } from "./teacherRequest";

export class TeacherDto extends TeacherRequest {
    @ApiProperty()
    @IsMongoId()
    id: string;
}