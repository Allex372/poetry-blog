import { ThumbsUp, DeleteIcon } from '../../../icons';
import clsx from 'clsx';

import styles from './PostCard.module.scss';

type PostCardProps = {
  id?: number | string;
  src?: string;
  title?: string;
  text?: string;
  theme: number | undefined | null | string;
  style?: boolean;
  userName?: string;
  onDelete?: () => void;
  key: string;
  userID?: string;
  creator?: string;
};

export const PostCard = ({ src, title, text, theme, userName, onDelete, userID, key, creator }: PostCardProps) => {
  return (
    <>
      <div
        key={key}
        style={{ marginLeft: '16px' }}
        className={clsx(
          theme && theme === 1 && [styles.cardWrapper, styles.cardWrapperDark],
          theme && theme === 2 && [styles.cardWrapper, styles.cardWrapperLight],
          theme && theme === 3 && [styles.cardWrapper, styles.cardWrapperClassic],
        )}
      >
        <div className={styles.headerWrapper}>
          <div className={styles.textWrapper}>
            <p className={clsx(theme && theme === 1 ? [styles.title, styles.titleLight] : styles.title)}>Created by:</p>
            <p className={clsx(theme && theme === 1 ? [styles.title, styles.titleLight] : styles.title)}>{userName}</p>
          </div>
          {userID === creator && (
            <div>
              <DeleteIcon
                onClick={onDelete}
                className={clsx(theme && theme === 1 ? [styles.icon, styles.iconBucketLight] : styles.bucketIcon)}
              />
            </div>
          )}
        </div>
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
    </>
  );
};
