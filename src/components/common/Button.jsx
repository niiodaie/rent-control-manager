import React from 'react';
import { Button as UIButton } from '../ui/button';

const Button = ({ children, variant = 'default', size = 'default', className = '', ...props }) => {
  return (
    <UIButton variant={variant} size={size} className={className} {...props}>
      {children}
    </UIButton>
  );
};

export default Button;

