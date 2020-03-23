import React from 'react';

import { roomOptsByEvent } from './constants';
import Room, { room_def } from './Room';

export const nightstay_def = () => {
  const room = room_def();
  return {
    ...room
  };
};

const NightStay = ( {nightstayinfo, updateNightStayinfo, updateEventFees, prices} ) => {
  if (nightstayinfo === undefined) return null;

  return (
    <div style={{display:'flex', flexFlow:'column', borderStyle:'solid', padding: '5px', margin:'5px'}}>
      <Room
        roominfo={nightstayinfo}
        updateRoominfo={updateNightStayinfo}
        tentOrRoom='Room'
        roomOpts={roomOptsByEvent.N}
        prices={prices}
        updateEventFees={updateEventFees}
      />
    </div>
  );
};

export default NightStay;
