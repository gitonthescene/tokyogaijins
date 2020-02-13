import React from 'react';

import CondDisplay from './components/CondDisplay';
import Entry from './components/Entry';
import Choice from './components/Choice';

import { NOTNEEDED, YesNo, bootsizeOpts, jacketpantsizeOpts, glovesizeOpts, neededOpts } from './constants';
import { createOnChange } from './utils';

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

export const unryu_def = () =>{return {
  height: '',
  bootsize: '',
  hikingboots: 'No',
  jacketpantsize: NOTNEEDED,
  glovesize: NOTNEEDED,
  goggles: NOTNEEDED,
}};

const Unryu = ( {unryuinfo, updateUnryuinfo, updateEventFees} ) => {
  if ( unryuinfo === undefined ) return null;

  const onChange = createOnChange( unryuinfo, updateUnryuinfo, updateEventFees, prices );

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

export default Unryu;
