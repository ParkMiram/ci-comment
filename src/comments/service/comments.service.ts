import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, UpdateResult} from 'typeorm';
import {Comment} from "../entity/comment.entity";
import {ExceptionHandler} from "../exception/notFoundBoardIdException";

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private commentsRepository: Repository<Comment>,
        private readonly exception: ExceptionHandler,
    ) {}

    // 전체 조회
    async findAll() {
        return this.commentsRepository.find();
    }

    // 게시글 댓글 조회
    async findAllByBoardId(boardId: number): Promise<Comment[]> {
        // await this.exception.boardIdException(boardId);
        return this.commentsRepository.findBy({ boardId: boardId });
    }

    // 단일 조회
    async findOne(boardId: number, id: number): Promise<Comment | null> {
        // await this.exception.boardIdException(boardId);
        return this.commentsRepository.findOneBy({ boardId: boardId, id: id });
    }

    // 저장
    async save(boardId: number, data: Comment): Promise<void> {
        // await this.exception.boardIdException(boardId);
        await this.commentsRepository.save({
            boardId: data.boardId,
            text: data.text
        });
    }

    // 수정
    async update(boardId: number, id: number, text: string): Promise<void> {
        // await this.exception.boardIdException(boardId);
        await this.commentsRepository.update(id, { text: text });
    }

    // 삭제
    async remove(boardId: number, id: number): Promise<void> {
        // await this.exception.boardIdException(boardId);
        await this.commentsRepository.delete(id);
    }
}
