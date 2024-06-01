import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Comment} from "./comments/entity/comment.entity";
import {CommentsModule} from "./comments/comments.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'cmmt-mysql',
      port: 3307,
      username: 'root',
      password: '1234',
      database: 'comments',
      // entities: [Comment],
      entities: [__dirname + "/{src,dist}/**/*{.ts,.js}"],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }), CommentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
