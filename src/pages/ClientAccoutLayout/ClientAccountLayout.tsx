import { useMemo, useContext, useState, useEffect, useCallback } from 'react';
import { Route } from 'react-router-hoc';
import { toast } from 'react-toastify';
import { useQuery, useMutation } from 'react-query';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import { PostCard } from '../PostsLayot/PostCard';
import { ConfirmationModal, CustomDialog, PhotoPreviewModal } from '../../components';
import { RefetchContext } from '../../context/Refetch';
import { useAuth } from '../../context';
import { PostInterface, User } from '../../types';
import { api, apiRoutes } from '../../api';
import { useTheme } from '../../hooks';

import styles from './ClientAccount.module.scss';

const ClientAccountRoute = Route(
  {
    id: Route.params.string.optional,
    theme: Route.query.number,
  },
  ({ id }) => `/account/${id}`,
);

interface PostData {
  data: PostInterface[];
}

const btnStyle = { backgroundColor: '#00b8ff', color: 'white', fontWeight: 'bold', marginTop: '16px' };

export const ClientAccount = ClientAccountRoute(
  ({
    match: {
      params: { id },
    },
  }) => {
    const { userData } = useAuth();
    const { theme } = useTheme();
    const { isRefetch } = useContext(RefetchContext);

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openPhotoDialog, setOpenPhotoDialog] = useState<boolean>(false);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);
    const [photoToOpen, setPhototoOpen] = useState<string | null>(null);

    const getPostsQuery = () => api.get(`${apiRoutes.posts}/${id}`).then((res) => res.data);
    const { data, refetch, isFetching, isLoading } = useQuery<PostData>([id, 'postsQuery'], () => getPostsQuery());

    const getUserQuery = () => api.get(`${apiRoutes.users}/${id}`).then((res) => res.data);
    const {
      data: currentUser,
      isFetching: userIsFetching,
      isLoading: userIsLoading,
    } = useQuery<User>('getUserQuery', () => getUserQuery(), {
      enabled: userData?._id !== id,
    });

    const filteredPosts = useMemo(() => data?.data ?? [], [data]);

    const deletePostsQuery = (id: string) => api.delete(`${apiRoutes.posts}/${id}`).then((res) => res.data);
    const { mutateAsync: deletePostMutation } = useMutation('DeletePostQuery', (id: string) => deletePostsQuery(id), {
      onSuccess: () => {
        refetch();
        setOpenDialog(false);
        setPostToDelete(null);
        toast.success('Post has been successfully deleted');
      },
    });

    const handleDeleteProject = useCallback((id: string) => {
      setOpenDialog(true);
      setPostToDelete(id);
    }, []);

    const handleOpenPhotoPreview = useCallback((src: string) => {
      setPhototoOpen(src);
      setOpenPhotoDialog(true);
    }, []);

    const handleCloseSelectedPhotoDialog = () => {
      setOpenPhotoDialog(false);
    };

    const handleDelete = () => {
      postToDelete && deletePostMutation(postToDelete);
    };

    const handleFollowUser = () => {
      console.log('1');
    };

    const handleCloseSelectedDialog = () => setOpenDialog(false);

    useEffect(() => {
      isRefetch && refetch();
    }, [isRefetch]);

    if (isFetching || isLoading || userIsLoading || userIsFetching) return <CircularProgress />;

    return (
      <div className={styles.mainWrapper}>
        <div className={styles.header}>
          {userData?._id == id && userData?.avatar && <img src={userData?.avatar} className={styles.avatar} />}
          {userData?._id == id && !userData?.avatar && <p>Оберіть фото у налаштуваннях</p>}

          {userData?._id !== id && currentUser?.avatar && <img src={currentUser?.avatar} className={styles.avatar} />}

          {userData?._id !== id ? (
            <div className={styles.userName}>{currentUser?.name}</div>
          ) : (
            <div className={styles.userName}>{userData?.name}</div>
          )}

          {userData?._id !== id && (
            <Button style={btnStyle} variant="contained" onClick={() => handleFollowUser()}>
              Зафоловити
            </Button>
          )}
        </div>
        <div className={styles.formWrapper}>
          {filteredPosts?.map((el: PostInterface) => (
            <PostCard
              key={el.id}
              postID={el?._id}
              creator={el?.userID}
              src={el?.picture}
              title={el?.title}
              userName={el?.userName}
              text={el?.text}
              theme={theme}
              userAvatar={el?.user?.avatar}
              userID={userData?._id}
              onDelete={handleDeleteProject}
              onOpen={handleOpenPhotoPreview}
              comments={el?.comments}
              postsRefetch={refetch}
              canDeleteComment={true}
            />
          ))}
        </div>
        <CustomDialog
          open={openDialog}
          header="Ви впевнені, що хочете видалити даний пост?"
          // icon={<PlusIcon />}
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
      </div>
    );
  },
);

export default ClientAccount;
