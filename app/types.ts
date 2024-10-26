export interface Post {
  id: number;
  body: string;
  title: string;
}

export interface Comment {
  id: number;
  body: string;
  postId: number;
}
