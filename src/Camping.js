import React from 'react';

import Room, { room_def } from './Room';
import Choice from './components/Choice';

import { YesNo, roomOptsByEvent } from './constants';
import { createOnChange } from './utils';

export const campinginfo_def = () => {
  const roominfo = room_def();
  roominfo.room='No';
  return {
    mat: '',
    sleepingbag: '',
    bunkbed: '',
    bicycle: '',
    ...roominfo
}};

const Camping = ( {campinginfo, updateCampinginfo, updateEventFees, prices} ) => {
  if (campinginfo === undefined) return null;
  const onChange = createOnChange( campinginfo, updateCampinginfo, updateEventFees, prices );

  return (
    <div style={{display:'flex', flexFlow:'column', borderStyle:'solid', padding: '5px', margin:'5px'}}>
      <Room
        roominfo={campinginfo}
        updateRoominfo={updateCampinginfo}
        tentOrRoom='Tent'
        roomOpts={roomOptsByEvent.C}
        prices={prices}
      />
      <Choice
        nm='mat'
        items={YesNo}
        value={campinginfo.mat}
        label="Mat rental"
        onChange={onChange('mat')}
        price={prices.mat}
      />
      <Choice
        nm='sleepingbag'
        items={YesNo}
        value={campinginfo.sleepingbag}
        label="Sleeping bag rental"
        onChange={onChange('sleepingbag')}
        price={prices.sleepingbag}
      />
      <Choice
        nm='bunkbed'
        items={YesNo}
        value={campinginfo.bunkbed}
        label="Bunk bed"
        onChange={onChange('bunkbed')}
        price={prices.bunkbed}
      />
      <Choice
        nm='bicycle'
        items={YesNo}
        value={campinginfo.bicycle}
        label="Bicycle rental"
        onChange={onChange('bicycle')}
        price={prices.bicycle}
      />
    </div>
  );
};

export default Camping;
