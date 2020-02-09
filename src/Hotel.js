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

const Hotel = ( {hotelinfo, setHotelinfo} ) => {
  const onChange = nm => e => {
    const newval = Object.assign( {}, hotelinfo, { [nm]: e.target.value } );
    setHotelinfo( newval );
  };
  return (
    <div style={{display:'flex', flexFlow:'column', borderStyle:'solid', padding: '5px', margin:'5px'}}>
      <div comment="FIXME This should probably be a radio"/>
      <Choice
        nm='happoike'
        items={YesNo}
        value={hotelinfo.happoike}
        label="Happoike"
        onChange={onChange('happoike')}
      />
      <Choice
        nm='tsugaike'
        items={YesNo}
        value={hotelinfo.tsugaike}
        label="Tsugaike"
        onChange={onChange('tsugaike')}
      />
      <Choice
        nm='tateyama'
        items={YesNo}
        value={hotelinfo.tateyama}
        label="Tateyama"
        onChange={onChange('tateyama')}
      />
    </div>
  );
};

export default Hotel;
