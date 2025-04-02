import { AuthModule } from "./modules/auth/auth.module";
import { SchoolsModule } from "./modules/schools/schools.module";
import { TeachersModule } from "./modules/teachers/teachers.module";

const modules = [TeachersModule,SchoolsModule,AuthModule];

export default modules;