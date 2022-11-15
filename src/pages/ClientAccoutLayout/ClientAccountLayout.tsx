import { useMemo, useContext, useState } from 'react';
import { Route } from 'react-router-hoc';
import { toast } from 'react-toastify';
import { useQuery, useMutation } from 'react-query';
import CircularProgress from '@material-ui/core/CircularProgress';

import { PostCard } from '../PostsLayot/PostCard';
import { ConfirmationModal, CustomDialog } from '../../components';
import Context from '../../context/Context';
import { useAuth } from '../../context';
import { PostInterface } from '../../types';
// import { links } from '../../App';
import { api, apiRoutes } from '../../api';
// import clsx from 'clsx';

import styles from './ClientAccount.module.scss';

const ClientAccountRoute = Route(
  {
    id: Route.params.string.optional,
    theme: Route.query.number,
  },
  ({ id }) => `/account/${id}`,
);

export const ClientAccount = ClientAccountRoute(
  ({
    match: {
      params: { id },
    },
  }) => {
    const { userData } = useAuth();
    const { currentTheme } = useContext(Context);

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);

    const getPostsQuery = () => api.get(`${apiRoutes.posts}/${id}`).then((res) => res.data);
    const { data, refetch, isFetching, isLoading } = useQuery('postsQuery', () => getPostsQuery());

    const filteredPosts = useMemo(() => (data ? data : []), [data]);

    const deletePostsQuery = (id: string) => api.delete(`${apiRoutes.posts}/${id}`).then((res) => res.data);
    const { mutateAsync: deletePostMutation } = useMutation('DeletePostQuery', (id: string) => deletePostsQuery(id), {
      onSuccess: () => {
        refetch();
        setOpenDialog(false);
        setPostToDelete(null);
        toast.success('Post has been successfully deleted');
      },
    });

    const handleDeleteProject = (id: string) => {
      setOpenDialog(true);
      setPostToDelete(id);
    };

    const handleDelete = () => {
      postToDelete && deletePostMutation(postToDelete);
    };

    const handleCloseSelectedDialog = () => setOpenDialog(false);

    if (isFetching || isLoading) return <CircularProgress />;

    return (
      <>
        <div className={styles.formWrapper}>
          {filteredPosts?.data?.map((el: PostInterface) => (
            <PostCard
              key={el.id}
              postID={el?._id}
              creator={el?.userID}
              src={el?.picture}
              title={el?.title}
              userName={el?.userName}
              text={el?.text}
              theme={currentTheme}
              userID={userData?._id}
              onDelete={() => handleDeleteProject(el?._id)}
              comments={el?.comments}
              postsRefetch={refetch}
              canDeleteComment={true}
            />
          ))}
        </div>
        <CustomDialog
          open={openDialog}
          header="Are you sure that you want delete this post?"
          // icon={<PlusIcon />}
          onClose={handleCloseSelectedDialog}
        >
          <ConfirmationModal
            text="You won`t be able to restore it"
            onSubmit={handleDelete}
            onClose={handleCloseSelectedDialog}
          />
        </CustomDialog>
      </>
    );
  },
);

export default ClientAccount;
