export interface PostInterface {
  createdAt: string;
  id: string;
  picture: string;
  text: string;
  title: string;
  updatedAt: string;
  userID: string;
  __v: number;
  _id: string;
  userName: string;
  comments?: Comment[];
}

export interface Comment {
  _id: string;
  userID: string;
  postID: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  id: string;
  user?: User;
}

export interface User {
  createdAt: string;
  email: string;
  name: string;
  password: string;
  role: string;
  updatedAt: string;
  userID: string;
  __v: number;
  _id: string;
}
