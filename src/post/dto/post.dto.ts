import { PostDetail } from '../post.types';

export class ResponsePostDto {
  sucess: boolean;
  message: string;
  data: PostDetail;
}
