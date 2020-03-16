import React from 'react';

import RentalLessonInfo, { rentallessoninfo_def } from './RentalLessonInfo';
import Room, { room_def } from './Room';

import { roomOptsByEvent } from './constants';

export const skisnoinfo_def = () => {
  const room = room_def();
  const rental = rentallessoninfo_def();
  return {
    ...rental,
    ...room
  };
};

const SkiSnowboarding = ( {skisnoinfo, updateSkiSnoinfo, updateEventFees, prices} ) => {
  if (skisnoinfo === undefined) return null;

  return (
    <>
      <div style={{display:'flex', flexFlow:'column', borderStyle:'solid', padding: '5px', margin:'5px'}}>
        <RentalLessonInfo
          eventType='S'
          rentallessoninfo={skisnoinfo}
          updateRentallessoninfo={updateSkiSnoinfo}
          prices={prices}
          updateEventFees={updateEventFees}
        />
      </div>
      <div style={{display:'flex', flexFlow:'column', borderStyle:'solid', padding: '5px', margin:'5px'}}>
        <Room
          roominfo={skisnoinfo}
          updateRoominfo={updateSkiSnoinfo}
          tentOrRoom='Room'
          roomOpts={roomOptsByEvent.Z}
          prices={prices}
        />
      </div>
    </>
  );
};

export default SkiSnowboarding;
