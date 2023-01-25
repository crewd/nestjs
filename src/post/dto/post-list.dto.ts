import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PostListDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  writer: string;

  @Expose()
  createdTime: Date;

  @Expose()
  updatedTime: Date;
}
