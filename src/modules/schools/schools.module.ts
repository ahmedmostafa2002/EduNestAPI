import { Module } from "@nestjs/common";
import { SchoolsController } from "./schools.controller";
import { SchoolsService } from "./schools.service";
import { TeachersModule } from "../teachers/teachers.module";


@Module({
    imports:[TeachersModule],
    controllers:[SchoolsController],
    providers:[SchoolsService],
})
export class SchoolsModule {}