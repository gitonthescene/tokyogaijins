import React from 'react';

import RentalLessonInfo, { rentallessoninfo_def } from './RentalLessonInfo';
import Room, { room_def } from './Room';
import Choice from './components/Choice';

import { YesNo, YesNoMaybe, roomOptsByEvent } from './constants';
import { createOnChange } from './utils';

export const snowmonkey_def = () => {
  const room = room_def();
  const rental = rentallessoninfo_def();
  return {
    monkeyfest: 'No',
    sundaylift: 'No',
    ...rental,
    ...room
  };
};

// item: { value: price }
// item must match the nm of the field
// value must match the value in constants
export const prices = {
  lessons: {
    'Beginners snowboarding': 0,
    'Beginners skiing': 0,
    'Intermediate snowboarding (90mins)': 9000,
  }
};

const SnowMonkey = ({snowmonkeyinfo, updateSnowMonkeyinfo, updateEventFees}) => {
  if ( snowmonkeyinfo === undefined ) return null;

  const onChange = createOnChange( snowmonkeyinfo, updateSnowMonkeyinfo, updateEventFees );

  return (
    <>
    <div style={{display:'flex', flexFlow:'column', borderStyle:'solid', padding: '5px', margin:'5px'}}>
      <RentalLessonInfo
        eventType='S'
        rentallessoninfo={snowmonkeyinfo}
        updateRentallessoninfo={updateSnowMonkeyinfo}
        prices={prices}
        updateEventFees={updateEventFees}
      />
    </div>
    <div style={{display:'flex', flexFlow:'column', borderStyle:'solid', padding: '5px', margin:'5px'}}>
      <Room
        roominfo={snowmonkeyinfo}
        updateRoominfo={updateSnowMonkeyinfo}
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

export default SnowMonkey;
