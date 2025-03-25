import { Module } from '@nestjs/common';
import { StudentsModule } from './modules/employees/employees.module';
import { ProjectsModule } from './modules/projects/projects.module';


@Module({
  imports: [StudentsModule,ProjectsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
