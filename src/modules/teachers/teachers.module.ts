import { Module } from "@nestjs/common";
import { TeacherController } from "./teachers.controller";
import { TeacherService } from "./teachers.service";

@Module({
    controllers:[TeacherController],
    providers:[TeacherService],
    exports:[TeacherService]
})
export class TeachersModule{}