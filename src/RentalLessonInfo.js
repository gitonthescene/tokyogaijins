import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { NOTNEEDED, YesNo, equipmentOpts, bootsizeOpts, jacketpantsizeOpts, glovesizeOpts, neededOpts, lessonOpts, fees } from './constants';

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

const Entry = ({label,value, ...props}) => {
  return (
    <TextField
      type="text"
      label={label}
      value={value}
      {...props}
    />
  );
};

const CondDisplay = ({showif, children}) => {
  return showif ? <>{children}</> : null;
};

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

const RentalLessonInfo = ( {eventnm, rentallessoninfo, updateRentallessoninfo} ) => {
  if ( rentallessoninfo === undefined ) return null;
  const onChange = nm => e => {
    const val = e.target.value;
//    const newval = Object.assign( {}, rentallessoninfo, { [nm]: e.target.value } );
    updateRentallessoninfo( draft => { Object.assign( draft, { [nm]: val } ); } );
  };

  const labeltxt = (nm, txt) => {
    var price = fees[eventnm] ? ` (${fees[eventnm][nm]} yen)` : '';
    return txt + price;
  };
  
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
      <CondDisplay showif={eventnm==='U'}>
        <Choice
          nm='hikingboots'
          items={YesNo}
          value={rentallessoninfo.hikingboots}
          label={labeltxt('hikingboots', "Waterproof (gortex) hiking boots")}
          onChange={onChange('hikingboots')}
        />
      </CondDisplay>
      <CondDisplay showif={rentallessoninfo.hikingboots !== 'No' && rentallessoninfo.equipment === NOTNEEDED}>
        <div  style={{display:'flex', flexFlow:'column', marginLeft: '10px'}}>
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
        label={labeltxt('jacketpantsize', "Jacket and pants")}
        onChange={onChange('jacketpantsize')}
      />
      <Choice
        nm='glovesize'
        items={glovesizeOpts}
        value={rentallessoninfo.glovesize}
        label={labeltxt('glovesize',"Gloves")}
        onChange={onChange('glovesize')}
      />
      <Choice
        nm='goggles'
        items={neededOpts}
        value={rentallessoninfo.goggles}
        label={labeltxt('goggles',"Goggles")}
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
      />
    </>
  );
};

export default RentalLessonInfo;
