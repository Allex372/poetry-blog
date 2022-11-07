import { ThumbsUp } from '../../../icons';
import clsx from 'clsx';

import styles from './PostCard.module.scss';

type PostCardProps = {
  id?: number | string;
  src?: string;
  title?: string;
  text?: string;
  theme: number | undefined | null | string;
  style?: boolean;
};

export const PostCard = ({ src, title, text, theme, style }: PostCardProps) => {
  return (
    <div
      style={{ marginLeft: '16px' }}
      className={clsx(
        theme && theme === 1 && [styles.cardWrapper, styles.cardWrapperDark],
        theme && theme === 2 && [styles.cardWrapper, styles.cardWrapperLight],
        theme && theme === 3 && [styles.cardWrapper, styles.cardWrapperClassic],
      )}
    >
      <img className={styles.img} src={`http://localhost:5000/${src}`} />
      <div className={clsx(theme && theme === 1 ? [styles.title, styles.titleLight] : styles.title)}>{title}</div>
      <div className={clsx(theme && theme === 1 ? [styles.text, styles.titleLight] : styles.text)}>{text}</div>
      <div className={styles.info}>
        <p className={styles.comments}>9 comments</p>
        <div className={styles.likes}>
          <ThumbsUp className={clsx(theme && theme === 1 ? [styles.icon, styles.iconLight] : styles.icon)} />
        </div>
      </div>
    </div>
  );
};
