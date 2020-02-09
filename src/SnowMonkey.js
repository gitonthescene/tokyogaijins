import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { YesNo, YesNoMaybe, roomOptsByEvent } from './constants';
import RentalLessonInfo, { rentallessoninfo_def } from './RentalLessonInfo';
import Room, { room_def } from './Room';

export const snowmonkey_def = () => {return{
  monkeyfest: 'No',
  sundaylift: 'No',
  rental: rentallessoninfo_def(),
  room: room_def()
}};

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

const SnowMonkeyExtras = ({snowmonkeyinfo, updateSnowMonkeyinfo}) => {
  if ( snowmonkeyinfo === undefined ) return null;

  const updateRentallessoninfo = cb => {
    updateSnowMonkeyinfo( draft => { cb( draft.rental ); } );
  };

  const updateRoominfo = cb => {
    updateSnowMonkeyinfo( draft => { cb( draft.room ); } );
  };

  const onChange = nm => e => {
    const val = e.target.value;
    updateSnowMonkeyinfo( draft => { Object.assign( draft, { [nm]: val } ); } );
  };

  return (
    <>
    <div style={{display:'flex', flexFlow:'column', borderStyle:'solid', padding: '5px', margin:'5px'}}>
      <RentalLessonInfo
        eventType='S'
        rentallessoninfo={snowmonkeyinfo.rental}
        updateRentallessoninfo={updateRentallessoninfo}
      />
    </div>
    <div style={{display:'flex', flexFlow:'column', borderStyle:'solid', padding: '5px', margin:'5px'}}>
      <Room
        roominfo={snowmonkeyinfo.room}
        updateRoominfo={updateRoominfo}
        tentOrRoom='Room'
        roomOpts={roomOptsByEvent.M}
      />
    </div>
    <div style={{display:'flex', flexFlow:'column', borderStyle:'solid', padding: '5px', margin:'5px'}}>
      <Choice
        nm='monkeyfest'
        items={YesNo}
        value={snowmonkeyinfo.monkeyfest}
        label="Snow Monkey Music and Beer Festival"
        onChange={onChange('monkeyfest')}
      />
      <Choice
        nm='sundaylift'
        items={YesNoMaybe}
        value={snowmonkeyinfo.sundaylift}
        label="Discounted Sunday lift pass"
        onChange={onChange('sundaylift')}
      />
    </div>
    </>
  );
}

export default SnowMonkeyExtras;
