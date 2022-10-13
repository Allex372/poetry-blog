import { Route } from 'react-router-hoc';
import { PostCard } from './PostCard';
import logo from './img.jpeg'; // Tell webpack this JS file uses this image

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

export const PostsLayout = PostsLayoutRoute(
  ({
    match: {
      query: { theme },
    },
  }) => {
    return (
      <>
        <div className={styles.wrapper}>
          {PostsCardArray?.items?.map((el) => (
            <PostCard key={el.id} src={el.src} title={el.title} text={el.text} theme={theme} />
          ))}
        </div>
      </>
    );
  },
);

export default PostsLayout;
