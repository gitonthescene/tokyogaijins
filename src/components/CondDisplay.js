import React from 'react';

const CondDisplay = ({showif, hide, children}) => {
  if ( hide ) return <div style={{display:showif?'block':'none'}}>{children}</div>;
  return showif ? <>{children}</> : null;
};

export default CondDisplay;
