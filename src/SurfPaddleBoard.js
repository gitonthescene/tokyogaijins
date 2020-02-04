import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { bodysizeOpts, surfsupOpts } from './constants';

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

const SurfPaddleBoard = ( {surfpaddleinfo, setSurfpaddleinfo} ) => {
  const onChange = nm => e => {
    const newval = Object.assign( {}, surfpaddleinfo, { [nm]: e.target.value } );
    setSurfpaddleinfo( newval );
  };
  return (
    <div style={{display:'flex', flexFlow:'column', width:'40%', borderStyle:'solid', padding: '5px', margin:'5px'}}>
        nm='surforsup'
        items={surfsupOpts}
        value={surfpaddleinfo.surforsup}
        label="Surf or SUP?"
        onChange={onChange('surforsup')}
      />
      <Entry
        label="Your Height (in cm)"
        value={surfpaddleinfo.height}
        onChange={onChange('height')}
      />
      <Entry
        label="Your Weight (in kgs)"
        value={surfpaddleinfo.weight}
        onChange={onChange('weight')}
      />
      <Choice
        nm='bodysize'
        items={bodysizeOpts}
        value={surfpaddleinfo.bodysize}
        label="Body size"
        onChange={onChange('bodysize')}
      />
    </div>
  );
};

export default SurfPaddleBoard;
