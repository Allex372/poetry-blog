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
  photoPublicId: string;
  comments?: Comment[];
  user?: User;
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
  avatar?: string;
  avatarPublicId?: string | number;
}

export interface UpdateUserInterface {
  email?: string;
  name?: string;
  password?: string;
  _id?: string;
  updatedAt?: string;
  createdAt: string;
  file?: File;
  avatar?: string;
  avatarPublicId?: string | number;
  oldAvatar?: string;
}
