import { Route } from 'react-router-hoc';
import { PostCard } from './PostCard';

import styles from './PostsLayout.module.scss';

const PostsLayoutRoute = Route('/posts');

const PostsCardArray = {
  items: [
    {
      id: 1,
      src: 'image',
      title: 'Title',
      text: 'Text',
    },
    {
      id: 2,
      src: 'image',
      title: 'Title',
      text: 'Text',
    },
    {
      id: 3,
      src: 'image',
      title: 'Title',
      text: 'Text',
    },
    {
      id: 4,
      src: 'image',
      title: 'Title',
      text: 'Text',
    },
    {
      id: 5,
      src: 'image',
      title: 'Title',
      text: 'Text',
    },
    {
      id: 6,
      src: 'image',
      title: 'Title',
      text: 'Text',
    },
    {
      id: 7,
      src: 'image',
      title: 'Title',
      text: 'Text',
    },
    {
      id: 8,
      src: 'image',
      title: 'Title',
      text: 'Text',
    },
    {
      id: 9,
      src: 'image',
      title: 'Title',
      text: 'Text',
    },
    {
      id: 10,
      src: 'image',
      title: 'Title',
      text: 'Text',
    },
    {
      id: 11,
      src: 'image',
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
  return (
    <>
      <div className={styles.wrapper}>
        {PostsCardArray?.items?.map((el) => (
          <PostCard key={el.id} src={el.src} title={el.title} text={el.text} />
        ))}
      </div>
    </>
  );
});

export default PostsLayout;
