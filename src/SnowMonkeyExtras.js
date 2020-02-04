import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { events, YesNo, YesNoMaybe } from './constants';

export const snowmonkey_defaults = {
  monkeyfest: 'No',
  sundaylift: 'No',
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


const SnowMonkeyExtras = ({onChange, eventinfo}) => {
  const ifopts = nm => eventinfo ? eventinfo[nm] : undefined;
  return (
    <div  style={{display:'flex', flexFlow:'column', marginLeft: '10px'}}>
      <h4>Extras</h4>
      <Choice
        nm='monkeyfest'
        items={YesNo}
        value={ifopts('monkeyfest')}
        label="Snow Monkey Music and Beer Festival"
        onChange={onChange('monkeyfest')}
      />
      <Choice
        nm='sundaylift'
        items={YesNoMaybe}
        value={ifopts('sundaylift')}
        label="Discounted Sunday lift pass"
        onChange={onChange('sundaylift')}
      />
    </div>
  );
}

export default SnowMonkeyExtras;
