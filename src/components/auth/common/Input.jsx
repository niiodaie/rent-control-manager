import React from 'react';
import { Input as UIInput } from '../ui/input';

const Input = ({ className = '', ...props }) => {
  return (
    <UIInput className={className} {...props} />
  );
};

export default Input;

