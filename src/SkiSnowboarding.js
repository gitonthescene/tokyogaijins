import React from 'react';

import RentalLessonInfo, { rentallessoninfo_def } from './RentalLessonInfo';

export const skisnoinfo_def = () => {
  const rental = rentallessoninfo_def();
  return {
    ...rental
  };
};

const SkiSnowboarding = ( {skisnoinfo, updateSkiSnoinfo} ) => {
  if (skisnoinfo === undefined) return null;

  return (
    <div style={{display:'flex', flexFlow:'column', borderStyle:'solid', padding: '5px', margin:'5px'}}>
      <RentalLessonInfo
        eventType='S'
        rentallessoninfo={skisnoinfo}
        updateRentallessoninfo={updateSkiSnoinfo}
      />
    </div>
  );
};

export default SkiSnowboarding;
