import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { YesNo, roomOptsByEvent } from './constants';
import Room, { room_def } from './Room';

const Choice = ({nm, label, onChange, items, value, ...props}) => {
  const listitems = items.map( (tg) => (
    <MenuItem value={tg} key={tg}>
      {tg}
    </MenuItem>
  ) );

  return (
    <FormControl {...props}>
        <InputLabel htmlFor={'choice'+nm}>{label}</InputLabel>
        <Select
          id={'choice'+nm}
          value={value}
          onChange={onChange}
        >
          {listitems}
        </Select>
      </FormControl>
  );
};


export const campinginfo_def = () => {
  const roominfo = room_def();
  roominfo.room='No';
  return {
    mat: '',
    sleepingbag: '',
    bunkbed: '',
    ...roominfo
}};

const Camping = ( {campinginfo, updateCampinginfo} ) => {
  if (campinginfo === undefined) return null;

  const onChange = nm => e => {
    const val = e.target.value;
    updateCampinginfo( draft => { Object.assign( draft, { [nm]: val } );  } );
  };

  return (
    <div style={{display:'flex', flexFlow:'column', borderStyle:'solid', padding: '5px', margin:'5px'}}>
      <Room
        roominfo={campinginfo}
        updateRoominfo={updateCampinginfo}
        tentOrRoom='Tent'
        roomOpts={roomOptsByEvent.C}
      />
      <Choice
        nm='mat'
        items={YesNo}
        value={campinginfo.mat}
        label="Mat rental"
        onChange={onChange('mat')}
      />
      <Choice
        nm='sleepingbag'
        items={YesNo}
        value={campinginfo.sleepingbag}
        label="Sleeping bag rental"
        onChange={onChange('sleepingbag')}
      />
      <Choice
        nm='bunkbed'
        items={YesNo}
        value={campinginfo.bunkbed}
        label="Bunk bed"
        onChange={onChange('bunkbed')}
      />
    </div>
  );
};

export default Camping;
