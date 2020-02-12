import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { NOTNEEDED, equipmentOpts, bootsizeOpts, jacketpantsizeOpts, glovesizeOpts, neededOpts, lessonOpts } from './constants';

const Choice = ({nm, label, items, value, price, ...props}) => {
  const listitems = items.map( (tg) => (
    <MenuItem value={tg} key={tg} {...props}>
      {tg}
    </MenuItem>
  ) );

  const style = price ? { fontStyle: 'italic' } : {};
  const prclabel = price ? "* " : "";
  var prices = price && Object.keys(price);
  var pricedisplay = null;

  if ( prices ) {
    if ( prices.length === 1 ) {
      pricedisplay = `${price[prices[0]]} yen`;
    } else if ( prices.length > 1 ) {
      var samePrice = true;
      prices.forEach( p => { samePrice = samePrice && price[p] === price[prices[0]]; } );
      if ( samePrice ) {
        pricedisplay = `${price[prices[0]]} yen`;
      } else {
        pricedisplay = prices.filter( k => price[k] !== 0 ).map( k => `${k}: ${price[k]} yen` ).join( ", " );
      };
    };
  };

  return (
    <>
      <FormControl>
        <InputLabel htmlFor={'choice'+nm} style={style}>
          {prclabel}{label}
          <CondDisplay showif={price}>
            <span style={{fontSize:'small', color:'orange', margin:'10px'}}>({pricedisplay})</span>
          </CondDisplay>
        </InputLabel>
        <Select
          id={'choice'+nm}
          value={value}
          {...props}
        >
          {listitems}
        </Select>
      </FormControl>
    </>
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

const RentalLessonInfo = ( {eventnm, rentallessoninfo, updateRentallessoninfo, prices, updateEventFees} ) => {
  if ( rentallessoninfo === undefined ) return null;
  const onChange = nm => e => {
    const val = e.target.value;
    updateRentallessoninfo( draft => { Object.assign( draft, { [nm]: val } ); } );

    if ( prices[nm] && prices[nm][val] ) {
      updateEventFees( draft => { Object.assign( draft, { [nm]: prices[nm][val] } ); } );
    }
    else {
      // if setting val to a non-price, make sure there's no key
      updateEventFees( draft => { delete draft[nm]; } );
    }
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
