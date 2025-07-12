import React from 'react';
import { Alert as UIAlert, AlertDescription, AlertTitle } from '../ui/alert';

const Alert = ({ title, children, variant = 'default', className = '', ...props }) => {
  return (
    <UIAlert variant={variant} className={className} {...props}>
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </UIAlert>
  );
};

export default Alert;

