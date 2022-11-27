import { useContext, useEffect, useMemo, useState } from 'react';
import { Route } from 'react-router-hoc';
import { useQuery, useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { ConfirmationModal, CustomDialog, PhotoPreviewModal } from '../../components';
import CircularProgress from '@material-ui/core/CircularProgress';

import Context from '../../context/Context';
import { RefetchContext } from '../../context/Refetch';
import { PostCard } from './PostCard';
import { useAuth } from '../../context';
import { api, apiRoutes } from '../../api';
import { PostInterface } from '../../types';

import styles from './PostsLayout.module.scss';

const PostsLayoutRoute = Route(
  {
    theme: Route.query.number,
  },
  '/posts',
);

export const PostsLayout = PostsLayoutRoute(() => {
  const { userData } = useAuth();
  const { currentTheme } = useContext(Context);
  const { isRefetch } = useContext(RefetchContext);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openPhotoDialog, setOpenPhotoDialog] = useState<boolean>(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [photoToOpen, setPhototoOpen] = useState<string | null>(null);

  const getPostsQuery = () => api.get(apiRoutes.posts).then((res) => res.data);
  const { data, refetch, isLoading, isFetching } = useQuery('postsQuery', () => getPostsQuery());

  const deletePostsQuery = (id: string) => api.delete(`${apiRoutes.posts}/${id}`).then((res) => res.data);
  const { mutateAsync: deletePostMutation } = useMutation('DeletePostQuery', (id: string) => deletePostsQuery(id), {
    onSuccess: () => {
      refetch();
      setOpenDialog(false);
      setPostToDelete(null);
      toast.success('Post has been successfully deleted');
    },
  });

  const filteredPosts = useMemo(() => (data ? data : []), [data]);

  const handleDeleteProject = (id: string) => {
    setOpenDialog(true);
    setPostToDelete(id);
  };

  const handleOpenPhotoPreview = (src: string) => {
    setPhototoOpen(src);
    setOpenPhotoDialog(true);
  };

  const handleCloseSelectedPhotoDialog = () => {
    setOpenPhotoDialog(false);
  };

  const handleDelete = () => {
    postToDelete && deletePostMutation(postToDelete);
  };

  const handleCloseSelectedDialog = () => setOpenDialog(false);

  useEffect(() => {
    isRefetch && refetch();
  }, [isRefetch]);

  if (isFetching || isLoading) return <CircularProgress />;
  return (
    <>
      <div className={styles.wrapper}>
        {filteredPosts?.data?.map((el: PostInterface) => (
          <PostCard
            key={el._id}
            postID={el._id}
            creator={el?.userID}
            src={el?.picture}
            title={el?.title}
            userName={el?.userName}
            text={el?.text}
            theme={currentTheme}
            userID={userData?._id}
            postCreatorId={el?.userID}
            onDelete={() => handleDeleteProject(el?._id)}
            onOpen={() => handleOpenPhotoPreview(el?.picture)}
            comments={el?.comments}
            postsRefetch={refetch}
          />
        ))}
      </div>
      <CustomDialog
        open={openDialog}
        header="Ви впевнені, що хочете видалити даний пост?"
        onClose={handleCloseSelectedDialog}
      >
        <ConfirmationModal
          text="Цю дію не можливо відновити"
          onSubmit={handleDelete}
          onClose={handleCloseSelectedDialog}
        />
      </CustomDialog>
      <CustomDialog open={openPhotoDialog} onClose={handleCloseSelectedPhotoDialog}>
        <PhotoPreviewModal src={photoToOpen} />
      </CustomDialog>
    </>
  );
});

export default PostsLayout;
