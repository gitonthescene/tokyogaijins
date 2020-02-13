import React from 'react';

import CondDisplay from './components/CondDisplay';
import Entry from './components/Entry';
import Choice from './components/Choice';

import { NOTNEEDED, equipmentOpts, bootsizeOpts, jacketpantsizeOpts, glovesizeOpts, neededOpts, lessonOpts } from './constants';
import { createOnChange } from './utils';

export const rentallessoninfo_def = () =>{return {
  equipment: NOTNEEDED,
  height: '',
  bootsize: '',
  hikingboots: 'No',
  jacketpantsize: NOTNEEDED,
  glovesize: NOTNEEDED,
  goggles: NOTNEEDED,
  helmet: NOTNEEDED,
  lessons: NOTNEEDED,

}};

const RentalLessonInfo = ( {rentallessoninfo, updateRentallessoninfo, prices, updateEventFees} ) => {
  if ( rentallessoninfo === undefined ) return null;

  const onChange = createOnChange( rentallessoninfo, updateRentallessoninfo, updateEventFees, prices );

  return (
    <>
      <Choice
        nm='equipment'
        items={equipmentOpts}
        value={rentallessoninfo.equipment}
        label="Ski/snowboard equipment"
        onChange={onChange('equipment')}
      />
      <CondDisplay showif={rentallessoninfo.equipment !== NOTNEEDED}>
        <div  style={{display:'flex', flexFlow:'column', marginLeft: '10px'}}>
          <Entry
            label="Your Height (in cm)"
            value={rentallessoninfo.height}
            onChange={onChange('height')}
          />
          <Choice
            nm='bootsize'
            items={bootsizeOpts}
            value={rentallessoninfo.bootsize}
            label="Boot size (in Japanese)"
            onChange={onChange('bootsize')}
          />
        </div>
      </CondDisplay>
      <Choice
        nm='jacketpantsize'
        items={jacketpantsizeOpts}
        value={rentallessoninfo.jacketpantsize}
        label="Jacket and pants"
        onChange={onChange('jacketpantsize')}
      />
      <Choice
        nm='glovesize'
        items={glovesizeOpts}
        value={rentallessoninfo.glovesize}
        label="Gloves"
        onChange={onChange('glovesize')}
      />
      <Choice
        nm='goggles'
        items={neededOpts}
        value={rentallessoninfo.goggles}
        label="Goggles"
        onChange={onChange('goggles')}
      />
      <Choice
        nm='helmet'
        items={neededOpts}
        value={rentallessoninfo.helmet}
        label="Helmet"
        onChange={onChange('helmet')}
      />
      <Choice
        nm='lessons'
        items={lessonOpts}
        value={rentallessoninfo.lessons}
        label="Ski/snowboard lesson"
        onChange={onChange('lessons')}
        price={prices.lessons}
      />
    </>
  );
};

export default RentalLessonInfo;
