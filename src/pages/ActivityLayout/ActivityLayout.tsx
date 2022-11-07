import { useContext, useMemo } from 'react';
import { useQuery } from 'react-query';
import { Route } from 'react-router-hoc';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import Context from '../../context/Context';
import { api, apiRoutes } from '../../api';
import clsx from 'clsx';

import styles from './Activity.module.scss';

const ActivityLayoutRoute = Route(
  {
    theme: Route.query.number,
  },
  '/activity',
);

export const ActivityLayout = ActivityLayoutRoute(() => {
  const { currentTheme } = useContext(Context);

  const getStatisticQuery = () => api.get(apiRoutes.activity).then((res) => res.data);
  const { data } = useQuery('statisticQuery', () => getStatisticQuery());

  const filteredStats = useMemo(() => (data ? data : []), [data]);

  const CustomTooltip = ({
    active,
    payload,
    label,
    name,
  }: {
    active?: boolean;
    // eslint-disable-next-line
    payload?: Array<any>;
    label?: string;
    name?: string;
  }) => {
    if (active && payload) {
      return (
        <div className={styles.customTooltip}>
          <p>{label}</p>
          <p
            className={clsx(
              currentTheme == '1' && styles.tooltipTextDarkTheme,
              currentTheme == '2' && styles.tooltipTextClassicTheme,
              currentTheme == '3' && styles.tooltipTextClassicTheme,
            )}
          >{`${name ? name : `avarage`}: ${payload[0].value}`}</p>
        </div>
      );
    }

    return <></>;
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h2
          className={clsx(
            currentTheme == '1' && styles.tooltipTextDarkTheme,
            currentTheme == '2' && styles.tooltipTextClassicTheme,
            currentTheme == '3' && styles.tooltipTextLightTheme,
          )}
        >
          Posts statistic by mounth
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width={500}
            height={400}
            data={filteredStats?.data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip content={<CustomTooltip name="count" />} />
            <Bar dataKey="count" fill="#77c9e6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
});

export default ActivityLayout;
