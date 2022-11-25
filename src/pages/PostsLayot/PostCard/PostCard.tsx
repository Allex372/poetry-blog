import { useState, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import axios from 'axios';
import { ConfirmationModal, CustomDialog } from '../../../components';
import { api, apiRoutes } from '../../../api';
import Context from '../../../context/Context';
import clsx from 'clsx';

import { ThumbsUp, DeleteIcon } from '../../../icons';
import { Comment } from '../../../types';
import { useAuth } from '../../../context';

import styles from './PostCard.module.scss';

type PostCardProps = {
  id?: number | string;
  src?: string;
  title?: string;
  text: string;
  theme: number | undefined | null | string;
  style?: boolean;
  userName?: string;
  onDelete?: () => void;
  postID: string;
  userID?: string;
  creator?: string;
  comments?: Comment[];
  postsRefetch?: () => void;
  canDeleteComment?: boolean;
};

export const PostCard = ({
  src,
  title,
  text,
  theme,
  userName,
  onDelete,
  userID,
  postID,
  creator,
  comments,
  postsRefetch,
  canDeleteComment,
}: PostCardProps) => {
  const { userData } = useAuth();
  const { currentTheme } = useContext(Context);

  console.log(currentTheme);

  const [showMore, setShowMore] = useState<boolean>(false);
  const [postCommentsId, setPostCommentsId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [commentsToDelete, setCommentsToDelete] = useState<string | null>(null);

  const deleteCommentQuery = (id: string) => api.delete(`${apiRoutes.comments}/${id}`).then((res) => res.data);
  const { mutateAsync: deletePostMutation } = useMutation(
    'deleteCommentQuery',
    (id: string) => deleteCommentQuery(id),
    {
      onSuccess: () => {
        postsRefetch && postsRefetch();
        setOpenDialog(false);
        setCommentsToDelete(null);
        toast.success('Comment has been successfully deleted');
      },
    },
  );

  const handleOpenComments = (postID: string) => {
    postCommentsId === postID ? setPostCommentsId(null) : setPostCommentsId(postID);
  };

  const handleDeleteComment = (id: string) => {
    setOpenDialog(true);
    setCommentsToDelete(id);
  };

  const handleDelete = () => {
    commentsToDelete && deletePostMutation(commentsToDelete);
  };

  const handleCloseSelectedDialog = () => setOpenDialog(false);

  const handleWriteComment = async (value: string, postID: string) => {
    if (userData) {
      const values = {
        text: value,
        postID: postID,
        userID: userData._id,
      };
      axios
        .request({
          method: 'post',
          url: 'https://poetry-blog-nodejs.herokuapp.com/comments',
          data: values,
        })
        .then((res) => {
          if (res.status == 200) {
            toast.success('Commented');
            postsRefetch && postsRefetch();
          }
        });
    }
  };

  return (
    <>
      <div
        key={postID}
        style={{ marginLeft: '16px' }}
        className={clsx(
          theme && theme === 1 && [styles.cardWrapper, styles.cardWrapperDark],
          theme && theme === 2 && [styles.cardWrapper, styles.cardWrapperLight],
          theme && theme === 3 && [styles.cardWrapper, styles.cardWrapperClassic],
        )}
      >
        <div className={styles.headerWrapper}>
          <div className={styles.textWrapper}>
            <p className={clsx(theme && theme === 1 ? [styles.title, styles.titleLight] : styles.title)}>
              Created by:&nbsp;
            </p>
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
        <img className={styles.img} src={src} />
        <div className={clsx(theme && theme === 1 ? [styles.title, styles.titleLight] : styles.title)}>{title}</div>
        <div className={clsx(theme && theme === 1 ? [styles.text, styles.titleLight] : styles.text)}>
          {showMore ? (
            <span className={styles.br}>{text}</span>
          ) : (
            <span className={styles.br}>{text.substring(0, 20)}</span>
          )}
          {text.length > 20 && (
            <span className={styles.moreTextStyle} onClick={() => setShowMore(!showMore)}>
              {showMore ? 'Show less' : 'Show more'}
            </span>
          )}
        </div>

        {comments && Object.keys(comments[0]).length !== 0 ? (
          <div className={styles.info}>
            <div onClick={() => handleOpenComments(postID)}>
              <p className={styles.comments}>{postCommentsId ? 'Hide comments' : 'Check comments'}</p>
            </div>
            <div className={styles.likes}>
              <ThumbsUp className={clsx(theme && theme === 1 ? [styles.icon, styles.iconLight] : styles.icon)} />
            </div>
          </div>
        ) : (
          <div className={styles.info}>
            <p className={styles.comments}>No comments here</p>
            <div className={styles.likes}>
              <ThumbsUp className={clsx(theme && theme === 1 ? [styles.icon, styles.iconLight] : styles.iconRotate)} />
            </div>
          </div>
        )}
        {postCommentsId === postID &&
          comments?.map((comment: Comment) => (
            <div key={comment._id} className={styles.commentsWrapper}>
              <div className={styles.comments}>
                <div className={styles.userDataWrapper}>
                  <div className={styles.commentWrapper}>
                    <p className={styles.userData}>{comment?.user?.name ? comment?.user?.name : 'Unknown User'}:</p>
                    <p className={styles.commentStyle}>{comment.text}</p>
                  </div>
                  {canDeleteComment && (
                    <DeleteIcon
                      onClick={() => handleDeleteComment(comment?._id)}
                      className={clsx(theme && theme === 1 ? [styles.icon, styles.iconBucketLight] : styles.bucketIcon)}
                    />
                  )}
                </div>
                <p className={styles.data}>{new Date(comment?.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        {userData?._id && (
          <Formik
            initialValues={{ comment: '', id: postID }}
            onSubmit={({ comment }) => {
              handleWriteComment(comment, postID);
            }}
          >
            {() => (
              <Form className={styles.formWrapper}>
                <div className={styles.inputWrapper}>
                  <Field
                    component={TextField}
                    name="comment"
                    label="Write comment"
                    type="text"
                    InputProps={{ disableUnderline: true }}
                  />
                </div>
              </Form>
            )}
          </Formik>
        )}
        <CustomDialog
          open={openDialog}
          header="Are you sure that you want delete this comment?"
          // icon={<PlusIcon />}
          onClose={handleCloseSelectedDialog}
        >
          <ConfirmationModal
            text="You won`t be able to restore it"
            onSubmit={handleDelete}
            onClose={handleCloseSelectedDialog}
          />
        </CustomDialog>
      </div>
    </>
  );
};
