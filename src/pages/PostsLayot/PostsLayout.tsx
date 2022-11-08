import { useContext, useMemo, useState } from 'react';
import { Route } from 'react-router-hoc';
import { useQuery, useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { ConfirmationModal, CustomDialog } from '../../components';

import Context from '../../context/Context';
import { PostCard } from './PostCard';
// import logo from './img.jpeg'; // Tell webpack this JS file uses this image
// import { useAuth } from '../../context';
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
  const { currentTheme } = useContext(Context);

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const getPostsQuery = () => api.get(apiRoutes.posts).then((res) => res.data);
  const { data, refetch } = useQuery('postsQuery', () => getPostsQuery());

  const deletePostsQuery = (id: string) => api.put(`${apiRoutes.posts}/${id}`).then((res) => res.data);
  const { mutateAsync: deletePostMutation } = useMutation('DeletePostQuery', (id: string) => deletePostsQuery(id), {
    onSuccess: () => {
      refetch();
      toast.success('Post has been successfully deleted');
    },
  });

  const filteredPosts = useMemo(() => (data ? data : []), [data]);

  const handleDeleteProject = () => {
    setOpenDialog(true);
    console.log('any');
    // deletePostMutation(id);
  };

  function handleDelete() {
    console.log('delete');
  }

  const handleCloseSelectedDialog = () => setOpenDialog(false);

  // console.log(data);
  return (
    <>
      <div className={styles.wrapper}>
        {filteredPosts?.data?.map((el: PostInterface) => (
          <PostCard
            key={el?._id}
            src={el?.picture}
            title={el?.title}
            userName={el?.userName}
            text={el?.text}
            theme={currentTheme}
            onDelete={handleDelete}
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
});

export default PostsLayout;
