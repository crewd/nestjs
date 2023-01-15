import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/post/post.entity';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forFeature([Post]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
