import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {CommentsService} from "./service/comments.service";
import {CommentsController} from "./controller/comments.controller";
import {Comment} from "./entity/comment.entity";
import {ExceptionHandler} from "./exception/notFoundBoardIdException";

@Module({
    imports: [TypeOrmModule.forFeature([Comment])],
    providers: [CommentsService, ExceptionHandler],
    controllers: [CommentsController],
    exports: [CommentsService]
})
export class CommentsModule {}