import {InjectRepository} from "@nestjs/typeorm";
import {Comment} from "../entity/comment.entity";
import {Repository} from "typeorm";
import {Injectable, NotFoundException} from "@nestjs/common";

@Injectable()
export class ExceptionHandler {
    constructor(
        @InjectRepository(Comment)
        private commentsRepository: Repository<Comment>
    ) {}

    async boardIdException(boardId: number): Promise<any> {
        const exist = await this.commentsRepository.findOneBy({ boardId });
        if(!exist) throw new NotFoundException("게시판 아이디가 없습니다.");
    }
}