import { useState, FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import axios from 'axios';
import { ConfirmationModal, CustomDialog } from '../../../components';
import { api, apiRoutes } from '../../../api';
import clsx from 'clsx';

import { ThumbsUp, DeleteIcon } from '../../../icons';
import { Comment } from '../../../types';
import { useAuth } from '../../../context';
import { links } from '../../../App';

import styles from './PostCard.module.scss';

type PostCardProps = {
  id?: number | string;
  src: string;
  title?: string;
  text: string;
  theme: number | undefined | null | string;
  style?: boolean;
  userName?: string;
  onDelete?: (postID: string) => void;
  onOpen?: (src: string) => void;
  postID: string;
  userID?: string;
  creator?: string;
  comments?: Comment[];
  postsRefetch?: () => void;
  canDeleteComment?: boolean;
  postCreatorId?: string;
  userAvatar?: string;
};

export const PostCard: FC<PostCardProps> = memo(
  ({
    src,
    title,
    text,
    userName,
    onDelete,
    userID,
    postID,
    creator,
    comments,
    postsRefetch,
    canDeleteComment,
    postCreatorId,
    userAvatar,
    onOpen,
  }) => {
    const { userData } = useAuth();

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

    const handleWriteComment = (value: string, postID: string) => {
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
        <div key={postID} style={{ marginLeft: '16px' }} className={styles.cardWrapper}>
          <div className={styles.headerWrapper}>
            <div className={styles.textWrapper}>
              {userAvatar && <img className={styles.avatar} src={userAvatar} />}
              {postCreatorId ? (
                <NavLink to={links.ClientAccount({ id: postCreatorId })} className={styles.title}>
                  {userName}
                </NavLink>
              ) : (
                <p className={styles.title}>{userName}</p>
              )}
            </div>
            {userID === creator && (
              <div>
                <DeleteIcon onClick={() => onDelete?.(postID)} className={styles.bucketIcon} />
              </div>
            )}
          </div>
          <img className={styles.img} onClick={() => onOpen?.(src)} src={src} />
          <div className={styles.titleBottom}>{title}</div>
          <div className={styles.text}>
            {showMore ? (
              <span className={styles.br}>{text}</span>
            ) : (
              <span className={styles.br}>{text.substring(0, 20)}</span>
            )}
            {text.length > 20 && (
              <span className={styles.moreTextStyle} onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Менше' : 'Більше'}
              </span>
            )}
          </div>

          {comments && Object.keys(comments[0]).length !== 0 ? (
            <div className={styles.info}>
              <div onClick={() => handleOpenComments(postID)}>
                <p className={styles.comments}>{postCommentsId ? 'Приховати коментарі' : 'Переглянути коментарі'}</p>
              </div>
              <div className={styles.likes}>
                <ThumbsUp className={styles.icon} />
              </div>
            </div>
          ) : (
            <div className={styles.info}>
              <p className={styles.comments}>Немає коментарів</p>
              <div className={styles.likes}>
                <ThumbsUp className={clsx(styles.icon, styles.iconRotate)} />
              </div>
            </div>
          )}
          {postCommentsId === postID &&
            comments?.map((comment: Comment) => (
              <div key={comment._id} className={styles.commentsWrapper}>
                <div className={styles.comments}>
                  <div className={styles.userDataWrapper}>
                    <div className={styles.commentWrapper}>
                      <p className={styles.userData}>{comment?.user?.name ? comment?.user?.name : 'Ноунейм'}:</p>
                      <p className={styles.commentStyle}>{comment.text}</p>
                    </div>
                    {canDeleteComment && (
                      <DeleteIcon onClick={() => handleDeleteComment(comment?._id)} className={styles.bucketIcon} />
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
                      label="Коментувати"
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
            header="Ви впевнені, що хочете видалити цей коментар?"
            onClose={handleCloseSelectedDialog}
          >
            <ConfirmationModal
              text="Ви не зможете відновити дану дію"
              onSubmit={handleDelete}
              onClose={handleCloseSelectedDialog}
            />
          </CustomDialog>
        </div>
      </>
    );
  },
);
