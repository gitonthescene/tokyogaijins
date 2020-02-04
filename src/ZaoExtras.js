import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { events, YesNo, YesNoMaybe } from './constants';

export const zao_defaults = {
  snowmonster: 'No',
  foxvillage: 'No'
};

const Choice = ({nm, label, items, value, ...props}) => {
  const listitems = items.map( (tg) => (
    <MenuItem value={tg} key={tg} {...props}>
      {tg}
    </MenuItem>
  ) );

  return (
      <FormControl>
        <InputLabel htmlFor={'choice'+nm}>{label}</InputLabel>
        <Select
          id={'choice'+nm}
          value={value}
          {...props}
        >
          {listitems}
        </Select>
      </FormControl>
  );
};


const ZaoExtras = ({onChange, eventinfo}) => {
  const ifopts = nm => eventinfo ? eventinfo[nm] : undefined;
  return (
    <div  style={{display:'flex', flexFlow:'column', marginLeft: '10px'}}>
      <h4>Extras</h4>
      <Choice
        nm='snowmonster'
        items={YesNo}
        value={ifopts('snowmonster')}
        label="Snow Monster Light up"
        onChange={onChange('snowmonster')}
      />
      <Choice
        nm='foxvillage'
        items={YesNo}
        value={ifopts('foxvillage')}
        label="Fox Village Trip"
        onChange={onChange('foxvillage')}
      />
    </div>
  );
}

export default ZaoExtras;
