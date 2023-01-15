import { Comment } from '../comment.types';

export class ResponseCommentsDto {
  success: boolean;
  message: string;
  data: Comment[];
}
