import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TeachersModule } from './modules/teachers/teachers.module';
import { SchoolsModule } from './modules/schools/schools.module';
import { LoggerMiddleware } from './middlewares/logger.midleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IsAuthenticatedMiddleware } from './middlewares/isAuthunticated.middleware';
import { CustomHeaderMiddleware } from './middlewares/custom.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import modules from './index';
import { TeacherController } from './modules/teachers/teachers.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory:async (configService:ConfigService)=>({
        uri:configService.get<string>("DB_URI")
      }),
      inject:[ConfigService]
    }),
    ...modules
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/');
    consumer.apply(IsAuthenticatedMiddleware).forRoutes(TeacherController);
    consumer.apply(CustomHeaderMiddleware).forRoutes("/");
  }
}
