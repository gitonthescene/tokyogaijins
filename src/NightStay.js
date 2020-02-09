import React from 'react';

import { roomOptsByEvent } from './constants';
import Room, { room_def } from './Room';

export const nightstay_def = () => {return {
  room: room_def()
}};

const NightStay = ( {nightstayinfo, updateNightStayinfo} ) => {
  if (nightstayinfo === undefined) return null;

  const updateRoominfo = cb => {
    updateNightStayinfo( draft => { cb( draft.room ); } );
  };

  return (
    <div style={{display:'flex', flexFlow:'column', borderStyle:'solid', padding: '5px', margin:'5px'}}>
      <Room
        roominfo={nightstayinfo.room}
        updateRoominfo={updateRoominfo}
        tentOrRoom='Room'
        roomOpts={roomOptsByEvent.N}
      />
    </div>
  );
};

export default NightStay;
