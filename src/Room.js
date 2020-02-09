import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { YesNo, mealOpts } from './constants';

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

const CondDisplay = ({showif, children}) => {
  return showif ? <>{children}</> : null;
};

export const room_def = () => {return {
  room: undefined,
  roompref: '',
  mealpref: 'No preference',
}};

// Changes to the general state if one state changes
export const getSideEffect = (nm, val) => {
  if ( nm === 'room' && val !== 'Yes' )
    return { roompref: '' };
  
  return {};
};

const Room = ( {roominfo, updateRoominfo, tentOrRoom, roomOpts, caveat} ) => {
  if ( roominfo === undefined ) return null;

  const onChange = nm => e => {
    const val = e.target.value;
    const sideEffect = getSideEffect( nm, e.target.value );
    updateRoominfo( draft => { Object.assign( draft, { [nm]: val }, sideEffect ); } );
  };

  const caveatdisp = caveat ? <span>{caveat}</span> : <></>;

  // Indent room preference if optional
  const margin = roominfo.room === undefined ? '0px' :'10px';
  return (
    <>
      <CondDisplay showif={roominfo.room !== undefined}>
        <Choice
          nm='room'
          items={YesNo}
          value={roominfo.room}
          label={tentOrRoom+" rental"}
          onChange={onChange('room')}
        />
      </CondDisplay>
      <CondDisplay showif={roominfo.room === undefined || roominfo.room === 'Yes'}>
        <div style={{display:'flex', flexFlow:'column', marginLeft: margin}}>
          <Choice
            nm='roompref'
            items={roomOpts}
            value={roominfo.roompref}
            label={tentOrRoom+" preference"}
            onChange={onChange('roompref')}
          />
        </div>
      </CondDisplay>
      <Choice
        nm='mealpref'
        items={mealOpts}
        value={roominfo.mealpref}
        label="Meal preference"
        onChange={onChange('mealpref')}
      />
      {caveatdisp}
    </>
  );
};

export default Room;
