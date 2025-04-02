import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TeachersModule } from "../teachers/teachers.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Teacher, TeacherSchema } from "src/schemas/teacher.schema";

@Module({
    imports:[TeachersModule,MongooseModule.forFeature([{name:Teacher.name,schema:TeacherSchema}])],
    controllers:[AuthController],
    providers:[AuthService]
})
export class AuthModule{}