import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { YesNo, roomOptsByEvent, mealOpts } from './constants';

const Choice = ({nm, label, onChange, items, value, ...props}) => {
  const listitems = items.map( (tg) => (
    <MenuItem value={tg} key={tg}>
      {tg}
    </MenuItem>
  ) );

  return (
    <FormControl {...props}>
        <InputLabel htmlFor={'choice'+nm}>{label}</InputLabel>
        <Select
          id={'choice'+nm}
          value={value}
          onChange={onChange}
        >
          {listitems}
        </Select>
      </FormControl>
  );
};

const CondDisplay = ({showif, children}) => {
  return showif ? <>{children}</> : null;
};

export const campinginfo_def = () => {return {
  tent: '',
  tentpref: '',
  mealpref: '',
  mat: '',
  sleepingbag: '',
  bunkbed: '',
}};

// Changes to the general state if one state changes
export const getSideEffect = (nm, val) => {
  if ( nm === 'tent' && val !== 'Yes' )
    return { tentpref: '' };
  
  return {};
};

const Camping = ( {campinginfo, updateCampinginfo} ) => {
  if (campinginfo === undefined) return null;
  const onChange = nm => e => {
    const val = e.target.value;
    const sideEffect = getSideEffect( nm, e.target.value );
    updateCampinginfo( draft => { Object.assign( draft, { [nm]: val }, sideEffect );  } );
  };

  return (
    <div style={{display:'flex', flexFlow:'column', width:'40%', borderStyle:'solid', padding: '5px', margin:'5px'}}>
      <Choice
        nm='mealpref'
        items={mealOpts}
        value={campinginfo.mealpref}
        label="Meal preference"
        onChange={onChange('mealpref')}
      />
      <Choice
        nm='tent'
        items={YesNo}
        value={campinginfo.tent}
        label="Tent rental"
        onChange={onChange('tent')}
      />
      <CondDisplay showif={campinginfo.tent === 'Yes'}>
        <div  style={{display:'flex', flexFlow:'column', marginLeft: '10px'}}>
        <Choice
          nm='tentpref'
          items={roomOptsByEvent.C}
          value={campinginfo.tentpref}
          label="Tent preference"
          onChange={onChange('tentpref')}
        />
        </div>
      </CondDisplay>
      <Choice
        nm='mat'
        items={YesNo}
        value={campinginfo.mat}
        label="Mat rental"
        onChange={onChange('mat')}
      />
      <Choice
        nm='sleepingbag'
        items={YesNo}
        value={campinginfo.sleepingbag}
        label="Sleeping bag rental"
        onChange={onChange('sleepingbag')}
      />
      <Choice
        nm='bunkbed'
        items={YesNo}
        value={campinginfo.bunkbed}
        label="Bunk bed"
        onChange={onChange('bunkbed')}
      />
    </div>
  );
};

export default Camping;
