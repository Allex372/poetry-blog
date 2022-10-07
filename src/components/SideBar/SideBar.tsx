// import React, { useRef, useState } from 'react';
import clsx from 'clsx';
// import { NavLink } from 'react-router-dom';
// import { useQuery } from 'react-query';

// import { SidebarItem, SidebarNavItem } from './SidebarItem';
// import { links } from 'App';
// import {
//   ArrowRightIcon,
//   UserIcon,
//   UsersIcon,
//   WorkOrderIcon,
//   InspectionIcon,
//   ProjectIcon,
//   NoteIcon,
//   DocumentTrackingIcon,
//   SettingIcon,
//   MetricsIcon,
//   CloseIcon,
//   ReportWritingIcon,
// } from 'icons';
// import { useAuth, useSidebar } from 'contexts';
// import { mobLogo, logoTitle } from 'assets/images';
// import { PermissionEnum } from 'types';
// import { getFullName } from 'utils';
// import { components } from 'generated/types';
// import { api, apiRoutes } from 'api';
// import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './SideBar.module.scss';

// type User = components['schemas']['User'];
// type Statistics = {
//   reports: number;
//   turnaround: number;
// };

export const Sidebar = () => {
  //   const { openSidebar, handleSidebarClose } = useSidebar();
  //   const { logout, userData } = useAuth();

  //   const sidebarRef = useRef<null | HTMLDivElement>(null);
  //   const [isNavBarExpanded, setIsNavBarExpanded] = useState(true);

  //   history.listen(() => {
  //     handleSidebarClose();
  //   });

  //   const statisticsQuery = () =>
  //     api.get<Statistics>(`${apiRoutes.reportsMetricsStatistics}/${userData?.id}`).then((res) => res.data);

  //   const { isLoading, data: metricsStatistics } = useQuery<Statistics>('statisticsQuery', () => statisticsQuery());

  //   if (isLoading) return <CircularProgress size={64} />;

  return (
    // <div
    //   ref={sidebarRef}
    //   className={clsx(styles.sidebar, openSidebar && styles.openSidebar, 'px-0 px-sm-8 pb-16 transition-02', {
    //     [styles.collapsed]: !isNavBarExpanded,
    //   })}
    // >
    <div className={styles.sideBarWrapper}>
      {/* <div
        className={clsx(
          styles.sidebarToggle,
          !isNavBarExpanded && styles.closed,
          'd-lg-flex align-items-center justify-content-center pointer d-none',
        )}
        onClick={() => setIsNavBarExpanded((prev) => !prev)}
      >
        <ArrowRightIcon />
      </div> */}

      <div className="flex d-sm-none align-items-center mb-20 w-100 p-relative">
        <div className="col-2"></div>

        <div className="col-8 flex justify-content-center">
          {/* <div>
            <img src={mobLogo} width="25" height="25" className={styles.logotype} alt="logotype" />
          </div> */}

          {/* <div>
            <img src={logoTitle} width="100" height="32" className={styles.logoTitle} alt="logoTitle" />
          </div> */}
        </div>

        {/* <div className="col-2 text-right">
          <CloseIcon className={styles.closeSidebarIcon} onClick={handleSidebarClose} />
        </div> */}
      </div>

      <div className={clsx(styles.logotypeContainer, 'flex align-items-start mb-40 transition-02 ml-12')}>
        {/* <div>
          <img src={mobLogo} width="36" height="36" className={styles.logotype} alt="logotype" />
        </div> */}

        {/* <div className="d-none d-lg-block">
          {isNavBarExpanded && (
            <img src={logoTitle} width="120" height="38" className={styles.logoTitle} alt="logoTitle" />
          )}
        </div> */}
      </div>

      <div className={clsx('flex flex-column flex-1 px-8 py-20 px-sm-0', styles.mainContainer)}>
        {/* <div className={clsx('flex-1', styles.pagesContainer)}>
          {userData?.permissions.has(PermissionEnum.work_order_access) && (
            <SidebarNavItem route={links.WorkOrders()} iconOnly={!isNavBarExpanded} activeClass={styles.active}>
              <span className={styles.iconContainer}>
                <WorkOrderIcon />
              </span>

              <span className={clsx(isNavBarExpanded ? 'visible fade-animation' : 'hidden')}>Work orders</span>
            </SidebarNavItem>
          )}

          {userData?.permissions.has(PermissionEnum.inspection_access) && (
            <SidebarNavItem route={links.Inspections()} iconOnly={!isNavBarExpanded} activeClass={styles.active}>
              <span className={styles.iconContainer}>
                <InspectionIcon />
              </span>

              <span className={clsx(isNavBarExpanded ? 'visible fade-animation' : 'hidden')}>Inspections</span>
            </SidebarNavItem>
          )}

          {userData?.permissions.has(PermissionEnum.project_access) && (
            <SidebarNavItem route={links.Projects()} iconOnly={!isNavBarExpanded} activeClass={styles.active}>
              <span className={styles.iconContainer}>
                <ProjectIcon />
              </span>

              <span className={clsx(isNavBarExpanded ? 'visible fade-animation' : 'hidden')}>Projects</span>
            </SidebarNavItem>
          )}

          {userData?.permissions.has(PermissionEnum.note_access) && (
            <SidebarNavItem route={links.Notes()} iconOnly={!isNavBarExpanded} activeClass={styles.active}>
              <span className={styles.iconContainer}>
                <NoteIcon />
              </span>

              <span className={clsx(isNavBarExpanded ? 'visible fade-animation' : 'hidden')}>Notes</span>
            </SidebarNavItem>
          )}

          {userData?.permissions.has(PermissionEnum.documents_access) && (
            <SidebarNavItem route={links.DocumentTracking()} iconOnly={!isNavBarExpanded} activeClass={styles.active}>
              <span className={styles.iconContainer}>
                <DocumentTrackingIcon />
              </span>

              <span className={clsx(isNavBarExpanded ? 'visible fade-animation' : 'hidden')}>Document Tracking</span>
            </SidebarNavItem>
          )}

          {userData?.permissions.has(PermissionEnum.contacts_access) && (
            <SidebarNavItem route={links.Contacts()} iconOnly={!isNavBarExpanded} activeClass={styles.active}>
              <span className={styles.iconContainer}>
                <UserIcon />
              </span>

              <span className={clsx(isNavBarExpanded ? 'visible fade-animation' : 'hidden')}>Contacts</span>
            </SidebarNavItem>
          )}

          {userData?.permissions.has(PermissionEnum.users_access) && (
            <SidebarNavItem route={links.Users()} iconOnly={!isNavBarExpanded} activeClass={styles.active}>
              <span className={styles.iconContainer}>
                <UsersIcon />
              </span>

              <span className={clsx(isNavBarExpanded ? 'visible fade-animation' : 'hidden')}>Users</span>
            </SidebarNavItem>
          )}

          <SidebarNavItem
            route={links.ReportWritingOverview()}
            iconOnly={!isNavBarExpanded}
            activeClass={styles.active}
          >
            <span className={styles.iconContainer}>
              <ReportWritingIcon />
            </span>

            <span className={clsx(isNavBarExpanded ? 'visible fade-animation' : 'hidden')}>Report Writing</span>
          </SidebarNavItem>

          <SidebarNavItem route={links.Settings()} iconOnly={!isNavBarExpanded} activeClass={styles.active}>
            <span className={styles.iconContainer}>
              <SettingIcon className={styles.settingIcon} />
            </span>

            <span className={clsx(isNavBarExpanded ? 'visible fade-animation' : 'hidden')}>Settings</span>
          </SidebarNavItem>
        </div> */}
        {/* {userData?.permissions.has(PermissionEnum.productivity_metrics_access) && (
          <NavLink to={links.Charts()} className={styles.metricsTab}>
            <div className="flex align-items-center">
              <span className={styles.iconContainer}>
                <MetricsIcon />
              </span>
              <span className={clsx(isNavBarExpanded ? 'visible fade-animation' : 'hidden', styles.metricsTabTitle)}>
                Productivity Metrics
              </span>
            </div>
            <div className={clsx(isNavBarExpanded ? 'visible fade-animation' : 'hidden')}>
              {userData?.permissions.has(PermissionEnum.productivity_metrics_widget_stats) && (
                <div className={clsx('uppercase weight-400 text-primary text-14', styles.metricsStatistics)}>
                  <p className="my-8 flex justify-content-between">
                    <span>Reports written:</span> <span className="weight-700 pr-8">{metricsStatistics?.reports}</span>
                  </p>
                  <p className="mb-8 flex justify-content-between">
                    <span>Turnaround:</span>{' '}
                    <span className="weight-700 pr-8">
                      {Math.round((metricsStatistics?.turnaround as number) * 100) / 100}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </NavLink>
        )} */}
        {/* <SidebarItem iconOnly={!isNavBarExpanded} onClick={() => logout()} className={styles.logoutContainer}>
          <span className={styles.iconContainer}>
            <UserIcon className={styles.logoutIcon} />
          </span>
          <div className={clsx(isNavBarExpanded ? 'visible fade-animation' : 'hidden')}>
            <span className="weight-700">{getFullName(userData as User)}</span> <br />
            Sign out
          </div>
        </SidebarItem> */}
        sideBar
      </div>
    </div>
  );
};
