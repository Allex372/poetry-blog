import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export const LoadingButton = (props: ButtonProps & { loading?: boolean }) => {
  const { loading, children, ...rest } = props;
  const btnStyle = { backgroundColor: '#00b8ff', color: 'white', fontWeight: 'bold' };
  return (
    <Button style={btnStyle} disabled={loading || props.disabled} {...rest}>
      {loading ? <CircularProgress color="inherit" size={24} /> : children}
    </Button>
  );
};
