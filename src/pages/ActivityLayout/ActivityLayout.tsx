import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Route } from 'react-router-hoc';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CircularProgress from '@material-ui/core/CircularProgress';

import { api, apiRoutes } from '../../api';

import styles from './Activity.module.scss';

const ActivityLayoutRoute = Route(
  {
    id: Route.params.string.optional,
    theme: Route.query.number,
  },
  ({ id }) => `/activity/${id}`,
);

interface AnalyticsInterface {
  data: { _id: number; count: number }[];
}

export const ActivityLayout = ActivityLayoutRoute(
  ({
    match: {
      params: { id },
    },
  }) => {
    const getStatisticQuery = async () =>
      api.get<AnalyticsInterface>(`${apiRoutes.activity}/${id}`).then((res) => res.data);

    const { data, isFetching, isLoading } = useQuery<AnalyticsInterface>('statisticQuery', getStatisticQuery);

    const filteredStatus = useMemo(() => data?.data ?? [], [data]);

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
      const CunstomDiv = ({ label }: { label: number | string | undefined }) => {
        if (label == 1) {
          return <p>Січень</p>;
        } else if (label == 2) {
          return <p>Лютий</p>;
          // eslint-disable-next-line
        } else if (label == 2) {
          return <p>Лютий</p>;
        } else if (label == 3) {
          return <p>Березень</p>;
        } else if (label == 4) {
          return <p>Квітень</p>;
        } else if (label == 5) {
          return <p>Травень</p>;
        } else if (label == 6) {
          return <p>Червень</p>;
        } else if (label == 7) {
          return <p>Липень</p>;
        } else if (label == 8) {
          return <p>Серпень</p>;
        } else if (label == 9) {
          return <p>Вересень</p>;
        } else if (label == 10) {
          return <p>Жовтень</p>;
        } else if (label == 11) {
          return <p>Листопад</p>;
        } else if (label == 12) {
          return <p>Грудень</p>;
        } else {
          return null;
        }
      };
      if (active && payload) {
        return (
          <div className={styles.customTooltip}>
            <CunstomDiv label={label} />
            <p className={styles.tooltip}>{`${name ? name : `avarage`}: ${payload[0].value}`}</p>
          </div>
        );
      }

      return <></>;
    };

    if (isFetching || isLoading) return <CircularProgress />;

    return (
      <>
        <div className={styles.wrapper}>
          <h2 className={styles.tooltip}>Статистика постів за місяць</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              width={500}
              height={400}
              data={filteredStatus}
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
              <Tooltip content={<CustomTooltip name="Кількість" />} />
              <Bar dataKey="count" fill="#77c9e6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </>
    );
  },
);

export default ActivityLayout;
