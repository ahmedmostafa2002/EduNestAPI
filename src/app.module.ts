import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TeachersModule } from './modules/teachers/teachers.module';
import { SchoolsModule } from './modules/schools/schools.module';
import { LoggerMiddleware } from './middlewares/logger.midleware';
import { ConfigModule } from '@nestjs/config';
import { IsAuthenticatedMiddleware } from './middlewares/isAuthunticated.middleware';


@Module({
  imports: [TeachersModule,SchoolsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/');
    consumer.apply(IsAuthenticatedMiddleware).forRoutes({path:"/teachers",method:RequestMethod.GET});
  }
}
