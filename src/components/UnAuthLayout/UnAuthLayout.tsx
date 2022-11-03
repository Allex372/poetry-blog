import React, { ReactNode } from 'react';

interface UnAuthLayoutProps {
  children: ReactNode;
}

export const UnAuthLayout = ({ children }: UnAuthLayoutProps) => {
  return <div>{children}</div>;
};
