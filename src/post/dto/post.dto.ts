import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PostDto {
  @Expose()
  id: number;

  @Expose()
  writer: string;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  createdTime: Date;

  @Expose()
  updatedTime: Date;
}
