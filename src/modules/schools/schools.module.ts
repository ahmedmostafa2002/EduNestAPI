import { Module } from "@nestjs/common";
import { SchoolsController } from "./schools.controller";
import { SchoolsService } from "./schools.service";
import { TeachersModule } from "../teachers/teachers.module";
import { MongooseModule } from "@nestjs/mongoose";
import { School, SchoolSchema } from "src/schemas/school.schema";
import { Teacher, TeacherSchema } from "src/schemas/teacher.schema";


@Module({
    imports:[TeachersModule,MongooseModule.forFeature([{name:School.name , schema:SchoolSchema}]),
    MongooseModule.forFeature([{name:Teacher.name,schema:TeacherSchema}])],
    controllers:[SchoolsController],
    providers:[SchoolsService],
})
export class SchoolsModule {}