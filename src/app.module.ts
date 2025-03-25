import { Module } from '@nestjs/common';
import { TeachersModule } from './modules/teachers/teachers.module';
import { SchoolsModule } from './modules/schools/schools.module';


@Module({
  imports: [TeachersModule,SchoolsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
