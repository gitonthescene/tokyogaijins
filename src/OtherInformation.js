import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { sexes, nationalities } from './constants';

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

const OtherInformation = ( {contactinfo, setContactinfo} ) => {
  const onChange = nm => e => {
    const newval = Object.assign( {}, contactinfo, { [nm]: e.target.value } );
    setContactinfo( newval );
  };
  return (
    <div style={{display:'flex', flexFlow:'column', width:'40%', borderStyle:'solid', padding: '5px', margin:'5px'}}>
      <Entry
        label="Age"
        value={contactinfo.age}
        onChange={onChange('age')}
      />
      <Entry
        label="Address (in Japan)"
        value={contactinfo.address}
        onChange={onChange('address')}
      />
      <Choice
        nm='room'
        items={sexes}
        label="Room Preference"
        value={contactinfo.room}
        onChange={onChange('room')}
      />
      <Choice
        nm='sex'
        items={sexes}
        value={contactinfo.sex}
        label="Sex"
        onChange={onChange('sex')}
      />
    </div>
  );
};

export default OtherInformation;
