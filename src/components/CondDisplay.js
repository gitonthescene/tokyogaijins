import React from 'react';

const CondDisplay = ({showif, children}) => {
  return showif ? <>{children}</> : null;
};

export default CondDisplay;
