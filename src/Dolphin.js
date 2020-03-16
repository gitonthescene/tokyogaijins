import React from 'react';

import CondDisplay from './components/CondDisplay';
import Entry from './components/Entry';
import Choice from './components/Choice';

import { YesNo, swimmingskillOpts, bodysizeOpts, shoesizeOpts } from './constants';
import { createOnChange, clearCombo, restoreComboElements, calcComboSideEffect } from './utils';

export const dolphininfo_def = () => {return {
  swimming: '',
  height: '',
  weight: '',
  shoesize: '',
  wetsuit: 'No',
  snorkelkit: 'No',
  snorkelmask: '',
  fins: '',
  boots: '',
  tent: '',
  sleepmat: '',
  sleepbag: '',
  snorkellesson: '',
  sightseeing: '',
  scuba: '',
}};

const snorkelClearCombo = clearCombo( 'snorkelkit', [ 'snorkelmask', 'fins', 'boots' ] );
const snorkelRestoreCombo = restoreComboElements( 'snorkelkit', [ 'snorkelmask', 'fins', 'boots' ] );
const getSnorkelSideEffect = calcComboSideEffect( 'snorkelkit', [ 'snorkelmask', 'fins', 'boots' ] );

const combo = {
  clearComboAll: draft => {
    snorkelClearCombo( draft );
  },

  restoreComboElementsAll: (state, sideEffect) => {
  const snorkelPrcUpd = snorkelRestoreCombo( state, sideEffect );
  return snorkelPrcUpd;
  }
};

// Changes to the general state if one state changes
export const getSideEffect = (nm, val, state) => {
  const snorkelSideEffect = getSnorkelSideEffect( nm, val, state );
  return snorkelSideEffect;
};

const Dolphin = ( {dolphininfo, updateDolphininfo, updateEventFees, prices} ) => {
  if (dolphininfo === undefined) return null;

  const onChange = createOnChange( dolphininfo, updateDolphininfo, updateEventFees, prices, combo, getSideEffect );

  return (
    <div style={{display:'flex', flexFlow:'column', borderStyle:'solid', padding: '5px', margin:'5px'}}>
      <Choice
        nm='swimming'
        items={swimmingskillOpts}
        value={dolphininfo.swimming}
        label="How would you describe your swimming ability?"
        onChange={onChange('swimming')}
      />
      <Choice
        nm='wetsuit'
        items={bodysizeOpts}
        value={dolphininfo.wetsuit}
        label="Wetsuit"
        comment="How does this work?  Does it use body size above?"
        onChange={onChange('wetsuit')}
        price={prices.wetsuit}
      />
      <CondDisplay showif={dolphininfo.wetsuit !== 'No'}>
        <div style={{display:'flex', flexFlow:'column', marginLeft: '10px'}}>
          <Entry
            label="Your Height (in cm)"
            value={dolphininfo.height}
            onChange={onChange('height')}
          />
          <Entry
            label="Your Weight (in kgs)"
            value={dolphininfo.weight}
            onChange={onChange('weight')}
          />
          <Choice
            nm='shoesize'
            items={shoesizeOpts}
            value={dolphininfo.shoesize}
            label="Shoe size (in JPN)"
            onChange={onChange('shoesize')}
          />
        </div>
      </CondDisplay>
      <Choice
        nm='snorkelkit'
        items={YesNo}
        value={dolphininfo.snorkelkit}
        label="Snorkelling kit set [Snorkel & mask, Fins & Boots]"
        comment="This should select the two choices below"
        onChange={onChange('snorkelkit')}
        price={prices.snorkelkit}
      />
      <CondDisplay
        showif={dolphininfo.snorkelkit==='No'}
        comment="If using CondDisplay, then you can't unchoose after selecting all">
        <div style={{display:'flex', flexFlow:'column', marginLeft: '10px'}}>
          <Choice
            nm='snorkelmask'
            items={YesNo}
            value={dolphininfo.snorkelmask}
            label="Snorkel and mask only"
            onChange={onChange('snorkelmask')}
            price={prices.snorkelmask}
          />
          <Choice
            nm='fins'
            items={YesNo}
            value={dolphininfo.fins}
            label="Fins only"
            onChange={onChange('fins')}
            price={prices.fins}
          />
          <Choice
            nm='boots'
            items={YesNo}
            value={dolphininfo.boots}
            label="Boots only"
            comment="FIXME What does this have to do with the shoesize above?"
            onChange={onChange('boots')}
            price={prices.boots}
          />
        </div>
      </CondDisplay>
      <Choice
        nm='tent'
        items={YesNo}
        value={dolphininfo.tent}
        label="Tent"
        onChange={onChange('tent')}
        price={prices.tent}
      />
      <Choice
        nm='sleepmat'
        items={YesNo}
        value={dolphininfo.sleepmat}
        label="Sleeping mat"
        onChange={onChange('sleepmat')}
        price={prices.sleepmat}
      />
      <Choice
        nm='sleepbag'
        items={YesNo}
        value={dolphininfo.sleepbag}
        label="Sleeping bag"
        onChange={onChange('sleepbag')}
        price={prices.sleepbag}
      />
      <Choice
        nm='snorkellesson'
        items={YesNo}
        value={dolphininfo.snorkellesson}
        label="Snorkeling lesson"
        onChange={onChange('snorkellesson')}
        price={prices.snorkellesson}
      />
      <Choice
        nm='sightseeing'
        items={YesNo}
        value={dolphininfo.sightseeing}
        label="Sightseeing"
        onChange={onChange('sightseeing')}
        price={prices.sightseeing}
      />
      <Choice
        nm='scuba'
        items={YesNo}
        value={dolphininfo.scuba}
        label="Scuba Dive Option"
        onChange={onChange('scuba')}
        price={prices.scuba}
      />
    </div>
  );
};

export default Dolphin;
