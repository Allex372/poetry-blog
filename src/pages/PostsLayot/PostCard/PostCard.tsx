import styles from './PostCard.module.scss';

type PostCardProps = {
  id?: number | string;
  src?: string;
  title?: string;
  text?: string;
};

export const PostCard = ({ src, title, text }: PostCardProps) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.img}>{src}</div>
      <div>{title}</div>
      <div>{text}</div>
    </div>
  );
};
