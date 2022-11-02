import React, { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './UnauthLayout.module.scss';

interface UnAuthLayoutProps {
  children: ReactNode;
}

export const UnAuthLayout = ({ children }: UnAuthLayoutProps) => {
  return <div>{children}</div>;
};
