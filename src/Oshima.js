import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { YesNo } from './constants';

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

const Oshima = ( {oshimainfo, setOshimainfo} ) => {
  const onChange = nm => e => {
    const newval = Object.assign( {}, oshimainfo, { [nm]: e.target.value } );
    setOshimainfo( newval );
  };
  return (
    <div style={{display:'flex', flexFlow:'column', borderStyle:'solid', padding: '5px', margin:'5px'}}>
      <Choice
        nm='trekking'
        items={YesNo}
        value={oshimainfo.trekking}
        label="Mt. Mihara trekking"
        onChange={onChange('trekking')}
      />
      <Choice
        nm='bike'
        items={YesNo}
        value={oshimainfo.bike}
        label="Mountain bike rental"
        onChange={onChange('bike')}
      />
      <Choice
        nm='helmet'
        items={YesNo}
        value={oshimainfo.helmet}
        label="Helmet rental"
        onChange={onChange('helmet')}
      />
    </div>
  );
};

export default Oshima;
