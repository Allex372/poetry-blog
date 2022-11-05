import { useContext, useEffect, useMemo } from 'react';
import { Route } from 'react-router-hoc';
import { useMutation, useQuery } from 'react-query';

import Context from '../../context/Context';
import { PostCard } from './PostCard';
import logo from './img.jpeg'; // Tell webpack this JS file uses this image
import { useAuth } from '../../context';
import { api, apiRoutes } from '../../api';

import styles from './PostsLayout.module.scss';

const PostsLayoutRoute = Route(
  {
    theme: Route.query.number,
  },
  '/posts',
);

const PostsCardArray = {
  items: [
    {
      id: 1,
      src: logo,
      title: 'Title',
      text: 'Text',
    },
    {
      id: 2,
      src: logo,
      title: 'Title',
      text: 'Text',
    },
    {
      id: 3,
      src: logo,
      title: 'Title',
      text: 'Text',
    },
    {
      id: 4,
      src: logo,
      title: 'Title',
      text: 'Text',
    },
    {
      id: 5,
      src: logo,
      title: 'Title',
      text: 'Text',
    },
    {
      id: 6,
      src: logo,
      title: 'Title',
      text: 'Text',
    },
    {
      id: 7,
      src: logo,
      title: 'Title',
      text: 'Text',
    },
    {
      id: 8,
      src: logo,
      title: 'Title',
      text: 'Text',
    },
    {
      id: 9,
      src: logo,
      title: 'Title',
      text: 'Text',
    },
    {
      id: 10,
      src: logo,
      title: 'Title',
      text: 'Text',
    },
    {
      id: 11,
      src: logo,
      title: 'Title',
      text: 'Text',
    },
  ],
  pagesTotal: 1,
  total: 11,
  count: 1,
  page: 1,
};

export const PostsLayout = PostsLayoutRoute(() => {
  const { currentTheme } = useContext(Context);

  const getPostsQuery = () => api.get(apiRoutes.posts).then((res) => res.data);
  const { data, isLoading, isFetching, refetch } = useQuery('postsQuery', () => getPostsQuery());

  const filteredPosts = useMemo(() => (data ? data : []), [data]);

  // console.log(data);
  return (
    <>
      <div className={styles.wrapper}>
        {filteredPosts?.data?.map((el: any) => (
          <PostCard key={el?._id} src={el?.picture} title={el?.title} text={el?.text} theme={currentTheme} />
        ))}
      </div>
    </>
  );
});

export default PostsLayout;
