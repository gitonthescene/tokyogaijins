import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { roomOpts2 } from './constants';

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

const Room = ( {roominfo, setRoominfo} ) => {
  const onChange = nm => e => {
    const newval = Object.assign( {}, roominfo, { [nm]: e.target.value } );
    setRoominfo( newval );
  };
  return (
    <div style={{display:'flex', flexFlow:'column', width:'40%', borderStyle:'solid', padding: '5px', margin:'5px'}}>
      <Choice
        nm='room'
        items={roomOpts2}
        value={roominfo.room}
        label="Room preference"
        onChange={onChange('room')}
      />
      <Choice
        nm='meal'
        items={roomOpts2}
        value={roominfo.meal}
        label="Meal preference"
        onChange={onChange('meal')}
      />
      <span>(We will try to accommodate all dietary requirements. However, we are unable to guarantee the hotel/lodge can cater for every meal.)</span>
    </div>
  );
};

export default Room;
