import { PostList } from '../post.types';

export class ResponsePostListDto {
  success: boolean;
  message: string;
  data: PostList[];
}
