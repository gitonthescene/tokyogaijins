import React from 'react';

import RentalLessonInfo, { rentallessoninfo_def } from './RentalLessonInfo';

export const skisnoinfo_def = () => {
  const rental = rentallessoninfo_def();
  return {
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

const SkiSnowboarding = ( {skisnoinfo, updateSkiSnoinfo, updateEventFees} ) => {
  if (skisnoinfo === undefined) return null;

  return (
    <div style={{display:'flex', flexFlow:'column', borderStyle:'solid', padding: '5px', margin:'5px'}}>
      <RentalLessonInfo
        eventType='S'
        rentallessoninfo={skisnoinfo}
        updateRentallessoninfo={updateSkiSnoinfo}
        prices={prices}
        updateEventFees={updateEventFees}
      />
    </div>
  );
};

export default SkiSnowboarding;
