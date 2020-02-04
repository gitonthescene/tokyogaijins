import React from 'react';

import RentalLessonInfo, { rentallessoninfo_def } from './RentalLessonInfo';

export const skisnoinfo_def = () => {return {
  rental: rentallessoninfo_def()
}};

const SkiSnowboarding = ( {skisnoinfo, updateSkiSnoinfo} ) => {
  if (skisnoinfo === undefined) return null;

  const updateRentallessoninfo = cb => {
    updateSkiSnoinfo( draft => { cb( draft.rental ); } );
  };
  return (
    <div style={{display:'flex', flexFlow:'column', width:'40%', borderStyle:'solid', padding: '5px', margin:'5px'}}>
      <RentalLessonInfo
        eventType='S'
        rentallessoninfo={skisnoinfo.rental}
        updateRentallessoninfo={updateRentallessoninfo}
      />
    </div>
  );
};

export default SkiSnowboarding;
