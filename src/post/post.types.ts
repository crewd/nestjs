export type PostList = {
  title: string;
  writer: string;
  createdTime: Date;
  updatedTime: Date;
};

export type PostDetail = {
  id: number;
  writer: string;
  title: string;
  content: string;
  createdTime: Date;
  updatedTime: Date;
};
