import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { YesNo } from './constants';
import RentalLessonInfo, { rentallessoninfo_def } from './RentalLessonInfo';

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

const Choice = ({nm, label, items, value, ...props}) => {
  const listitems = items.map( (tg) => (
    <MenuItem value={tg} key={tg} {...props}>
      {tg}
    </MenuItem>
  ) );

  return (
      <FormControl>
        <InputLabel htmlFor={'choice'+nm}>{label}</InputLabel>
        <Select
          id={'choice'+nm}
          value={value}
          {...props}
        >
          {listitems}
        </Select>
      </FormControl>
  );
};


const Zao = ( {zaoinfo, updateZaoinfo, updateEventFees} ) => {
  if (zaoinfo === undefined) return null;
  const onChange = nm => e => {
    const val = e.target.value;
    updateZaoinfo( draft => { Object.assign( draft, { [nm]: val } ); } );

    if ( prices[nm] && prices[nm][val] ) {
      updateEventFees( draft => { Object.assign( draft, { [nm]: prices[nm][val] } ); } );
    }
    else {
      // if setting val to a non-price, make sure there's no key
      updateEventFees( draft => { delete draft[nm]; } );
    }
  };

  return (
    <div  style={{display:'flex', flexFlow:'column', marginLeft: '10px'}}>
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
}

export default Zao;
