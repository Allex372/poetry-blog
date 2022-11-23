export const apiRoutes = {
  baseURL: process.env.REACT_APP_API_HEROKU_URL,
  refresh: '/login/refresh',
  signUp: '/registration',
  login: '/login',
  account: '/account',
  posts: '/posts',
  users: '/users',
  comments: '/comments',
  deletePosts: '/posts/delete',
  activity: '/posts/activity',
};
