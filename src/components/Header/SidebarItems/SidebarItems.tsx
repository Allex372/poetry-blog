import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import styles from './SidebarItems.module.scss';

export interface SidebarNavItemProps {
  children: React.ReactNode;
  route: string;
  className?: string;
  activeClass?: string;
  iconOnly?: boolean;
}

export const SidebarNavItem = ({ children, route, className, activeClass, iconOnly }: SidebarNavItemProps) => {
  return (
    <NavLink
      to={route}
      className={clsx(
        styles.sidebarLink,
        !iconOnly && styles.svgOffset,
        iconOnly ? 'px-18' : 'px-16',
        'my-8',
        'py-8',
        'flex',
        'align-items-center',
        'text-22',
        'text-black',
        className,
      )}
      activeClassName={activeClass}
    >
      {children}
    </NavLink>
  );
};
