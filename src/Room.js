import React from 'react';

import CondDisplay from './components/CondDisplay';
import Choice from './components/Choice';

import { YesNo, mealOpts } from './constants';
import { createOnChange } from './utils';

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

const Room = ( {roominfo, updateRoominfo, tentOrRoom, roomOpts} ) => {
  if ( roominfo === undefined ) return null;

  const onChange = createOnChange( roominfo, updateRoominfo );

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
    </>
  );
};

export default Room;
