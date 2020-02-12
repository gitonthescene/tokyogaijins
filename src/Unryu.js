import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { NOTNEEDED, YesNo, bootsizeOpts, jacketpantsizeOpts, glovesizeOpts, neededOpts } from './constants';

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

const genPrices = (opts, price) => {
  return Object.fromEntries( opts.filter( k => k !== NOTNEEDED ).map( k => [k,price] ) );
};

// item: { value: price }
// item must match the nm of the field
// value must match the value in constants
export const prices = {
  hikingboots: { 'Yes': 1000 },
  jacketpantsize: genPrices( jacketpantsizeOpts, 2000 ),
  glovesize: genPrices( glovesizeOpts, 500 ),
  goggles: { 'Yes': 500 },
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

export const unryu_def = () =>{return {
  height: '',
  bootsize: '',
  hikingboots: 'No',
  jacketpantsize: NOTNEEDED,
  glovesize: NOTNEEDED,
  goggles: NOTNEEDED,
}};

const UnryuInfo = ( {eventnm, unryuinfo, updateUnryuinfo, updateEventFees} ) => {
  if ( unryuinfo === undefined ) return null;

  const onChange = nm => e => {
    const val = e.target.value;
    updateUnryuinfo( draft => { Object.assign( draft, { [nm]: val } ); } );

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
        nm='hikingboots'
        items={YesNo}
        value={unryuinfo.hikingboots}
        label="Waterproof (gortex) hiking boots"
        onChange={onChange('hikingboots')}
        price={prices.hikingboots}
      />
      <CondDisplay showif={unryuinfo.hikingboots !== 'No'}>
        <div  style={{display:'flex', flexFlow:'column', marginLeft: '10px'}}>
          <Entry
            label="Your Height (in cm)"
            value={unryuinfo.height}
            onChange={onChange('height')}
          />
          <Choice
            nm='bootsize'
            items={bootsizeOpts}
            value={unryuinfo.bootsize}
            label="Boot size (in Japanese)"
            onChange={onChange('bootsize')}
          />
        </div>
      </CondDisplay>
      <Choice
        nm='jacketpantsize'
        items={jacketpantsizeOpts}
        value={unryuinfo.jacketpantsize}
        label="Jacket and pants"
        onChange={onChange('jacketpantsize')}
        price={prices.jacketpantsize}
      />
      <Choice
        nm='glovesize'
        items={glovesizeOpts}
        value={unryuinfo.glovesize}
        label="Gloves"
        onChange={onChange('glovesize')}
        price={prices.glovesize}
      />
      <Choice
        nm='goggles'
        items={neededOpts}
        value={unryuinfo.goggles}
        label="Goggles"
        onChange={onChange('goggles')}
        price={prices.goggles}
      />
    </>
  );
};

export default UnryuInfo;
