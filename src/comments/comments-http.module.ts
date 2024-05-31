import { Module } from '@nestjs/common';
import {CommentsModule} from "./comments.module";
import {CommentsService} from "./service/comments.service";
import {CommentsController} from "./controller/comments.controller";

@Module({
    imports: [CommentsModule],
    providers: [CommentsService],
    controllers: [CommentsController]
})
export class CommentHttpModule {}
