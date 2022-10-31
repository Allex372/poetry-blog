import { Route } from 'react-router-hoc';

import styles from './Activity.module.scss';

const ActivityLayoutRoute = Route(
  {
    theme: Route.query.number,
  },
  '/activity',
);

export const ActivityLayout = ActivityLayoutRoute(() => {
  return (
    <>
      <div className={styles.wrapper}>activity page</div>
    </>
  );
});

export default ActivityLayout;
