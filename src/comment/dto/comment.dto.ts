import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CommentDto {
  @Expose()
  id: number;

  @Expose()
  parentId: number;

  @Expose()
  userName: string;

  @Expose()
  content: string;

  @Expose()
  depth: number;

  @Expose()
  group: number;

  @Expose()
  order: number;

  @Expose()
  createdTime: Date;

  @Expose()
  updatedTime: Date;
}
