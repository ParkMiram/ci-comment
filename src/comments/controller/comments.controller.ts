import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CommentsService} from "../service/comments.service";
import {Comment} from "../entity/comment.entity";

@Controller('api/boards')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    // 전체 조회
    @Get('/comments')
    async getAll() {
        return this.commentsService.findAll();
    }
    // 게시글 댓글 조회
    @Get('/:bid/comments')
    async getAllComments(@Param('bid') boardId: number): Promise<Comment[]> {
        return this.commentsService.findAllByBoardId(boardId);
    }

    // 저장
    @Post('/:bid/comments')
    async insertComment(
        @Param('bid') boardId: number,
        @Body() data: Comment
    ): Promise<void> {
        await this.commentsService.save(boardId, data);
    }

    // 수정
    @Put('/:bid/comments/:id')
    async updateComment(
        @Param('bid') boardId: number,
        @Param('id') id: number,
        @Body() data: Comment
    ): Promise<void> {
        await this.commentsService.update(boardId, id, data.text);
    }

    // 삭제
    @Delete('/:bid/comments/:id')
    async deleteComment(
        @Param('bid') boardId: number,
        @Param('id') id: number
    ): Promise<void> {
        await this.commentsService.remove(boardId, id);
    }
}
