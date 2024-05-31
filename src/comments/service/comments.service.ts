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
        // private dataSource: DataSource
        private readonly exception: ExceptionHandler,
    ) {}

    // 전체 조회
    async findAll(boardId: number): Promise<Comment[]> {
        // const exist = await this.commentsRepository.findOneBy({ boardId });
        // if(!exist) throw new NotFoundException("게시판 아이디가 없습니다.");
        const error = await this.exception.boardIdException(boardId);
        console.log(error);
        return this.commentsRepository.findBy({ boardId: boardId });
    }

    // 단일 조회
    async findOne(boardId: number, id: number): Promise<Comment | null> {
        const exist = await this.commentsRepository.findOneBy({ boardId });
        if(!exist) throw new NotFoundException("게시판 아이디가 없습니다.");
        return this.commentsRepository.findOneBy({ boardId: boardId, id: id });
    }

    // 저장
    async save(boardId: number, data: Comment): Promise<void> {
        const exist = await this.commentsRepository.findOneBy({ boardId });
        if(!exist) throw new NotFoundException("게시판 아이디가 없습니다.");
        await this.commentsRepository.save({
            boardId: data.boardId,
            text: data.text
        });
    }

    // 수정
    async update(boardId: number, id: number, text: string): Promise<void> {
        const exist = await this.commentsRepository.findOneBy({ boardId });
        if(!exist) throw new NotFoundException("게시판 아이디가 없습니다.");
        await this.commentsRepository.update(id, { text: text });
    }

    // 삭제
    async remove(boardId: number, id: number): Promise<void> {
        const exist = await this.commentsRepository.findOneBy({ boardId });
        if(!exist) throw new NotFoundException("게시판 아이디가 없습니다.");
        await this.commentsRepository.delete(id);
    }
}
