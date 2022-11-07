import { useEffect, useMemo, useContext } from 'react';
import { Route } from 'react-router-hoc';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { PostCard } from '../PostsLayot/PostCard';

import { LoginForm } from '../../components';
import Context from '../../context/Context';
import { useAuth } from '../../context';
import { HttpErrorResponse, LoginFormValues } from '../../types';
import { links } from '../../App';
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
    const { currentTheme } = useContext(Context);

    const getPostsQuery = () => api.get(`${apiRoutes.posts}/${id}`).then((res) => res.data);
    const { data, isLoading, isFetching, refetch } = useQuery('postsQuery', () => getPostsQuery());

    const filteredPosts = useMemo(() => (data ? data : []), [data]);

    return (
      <div className={styles.formWrapper}>
        {filteredPosts?.data?.map((el: any) => (
          <PostCard
            key={el?._id}
            src={el?.picture}
            title={el?.title}
            text={el?.text}
            theme={currentTheme}
            style={true}
          />
        ))}
      </div>
    );
  },
);

export default ClientAccount;
