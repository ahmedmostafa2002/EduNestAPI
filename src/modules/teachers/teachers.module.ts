import { Module } from "@nestjs/common";
import { TeacherController } from "./teachers.controller";
import { TeacherService } from "./teachers.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Teacher, TeacherSchema } from "src/schemas/teacher.schema";

@Module({
    imports:[MongooseModule.forFeature([{name:Teacher.name,schema:TeacherSchema}])],
    controllers:[TeacherController],
    providers:[TeacherService],
    exports:[TeacherService]
})
export class TeachersModule{}