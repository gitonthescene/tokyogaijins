import React from 'react';

import RentalLessonInfo, { rentallessoninfo_def } from './RentalLessonInfo';
import Choice from './components/Choice';

import { YesNo } from './constants';
import { createOnChange } from './utils';

export const zao_def = () => {
  const rental = rentallessoninfo_def();
  return {
    snowmonster: 'No',
    foxvillage: 'No',
    ...rental
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

const Zao = ( {zaoinfo, updateZaoinfo, updateEventFees} ) => {
  if (zaoinfo === undefined) return null;
  const onChange = createOnChange( zaoinfo, updateZaoinfo, updateEventFees, prices );

  return (
    <div style={{display:'flex', flexFlow:'column', borderStyle:'solid', padding: '5px', margin:'5px'}}>
      <RentalLessonInfo
        eventType='S'
        rentallessoninfo={zaoinfo}
        updateRentallessoninfo={updateZaoinfo}
        prices={prices}
        updateEventFees={updateEventFees}
      />
      <Choice
        nm='snowmonster'
        items={YesNo}
        value={zaoinfo.snowmonster}
        label="Snow Monster Light up"
        onChange={onChange('snowmonster')}
      />
      <Choice
        nm='foxvillage'
        items={YesNo}
        value={zaoinfo.foxvillage}
        label="Fox Village Trip"
        onChange={onChange('foxvillage')}
      />
    </div>
  );
};

export default Zao;
