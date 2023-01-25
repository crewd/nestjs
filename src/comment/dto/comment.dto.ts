export class CommentDto {
  id: number;
  parentId: number;
  userName: string;
  content: string;
  depth: number;
  group: number;
  order: number;
  createdTime: Date;
  updatedTime: Date;
}
