import React from 'react';

import TextField from '@material-ui/core/TextField';

const Entry = ({label,value, ...props}) => {
  return (
    <TextField
      type="text"
      label={label}
      value={value}
      {...props}
    />
  );
};

export default Entry;
