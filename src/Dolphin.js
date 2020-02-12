import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { YesNo, swimmingskillOpts, bodysizeOpts, shoesizeOpts } from './constants';

const CondDisplay = ({showif, children}) => {
  return showif ? <>{children}</> : null;
};

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
      pricedisplay = prices.map( k => `${k}: ${price[k]} yen` ).join( ", " );
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

// item: { value: price }
// item must match the nm of the field
// value must match the value in constants.js
export const prices = {
  wetsuit: { 'S': 2000, 'M': 2000, 'L': 3000, 'XL': 3000 },
  snorkelkit: { 'Yes': 1400 },
  snorkelmask: { 'Yes': 700 },
  fins: { 'Yes': 350 },
  boots: { 'Yes': 350 },
  tent: { 'Yes': 2500 },
  sleepmat: { 'Yes': 500 },
  sleepbag: { 'Yes': 1000 },
  snorkellesson: { 'Yes': 4400 },
  sightseeing: { 'Yes': 3000 },
  scuba: { 'Yes': 10800 },
};

export const calcComboSideEffect = (full, elements) => {
  return (nm, val, state) => {
    if ( nm === full ) {
      if ( val === 'Yes' ) {
        return Object.fromEntries( elements.map( k => [ k, 'Yes' ] ) );
      } else {
        return Object.fromEntries( elements.map( k => [ k, 'No' ] ) );
      }
    };

    var comboElement = false;
    elements.forEach( k => {
      comboElement = comboElement || (k === nm);
    } );
    if ( !comboElement ) return {};

    var allChosen = true;
    elements.forEach( k => {
      const chk = (k === nm) ? val : state[k];
      allChosen = allChosen && (chk === 'Yes');
    } );
    console.log( elements, allChosen );
    if ( allChosen === true )
      return { [full]: 'Yes' };
    else
      return { [full]: 'No' };  
  };
};

export const clearCombo = (full, elements) => {
  return draft => {
    if ( draft[ full ] ) {
      elements.forEach( k => delete draft[k] );
    };
  };
};

// if going from combo to non-combo, restore prices of everything
export const restoreComboElements = (full, elements) => {
  return (state, sideEffect) => {
    if ( state[full] === 'Yes' && sideEffect[full] && 'No' )
      return Object.fromEntries(elements.map( k => [k, prices[k] && prices[k].Yes] ));
    return {};
  };
};

const snorkelClearCombo = clearCombo( 'snorkelkit', [ 'snorkelmask', 'fins', 'boots' ] );
const snorkelRestoreCombo = restoreComboElements( 'snorkelkit', [ 'snorkelmask', 'fins', 'boots' ] );
const getSnorkelSideEffect = calcComboSideEffect( 'snorkelkit', [ 'snorkelmask', 'fins', 'boots' ] );

export const clearComboAll = draft => {
  snorkelClearCombo( draft );
};

export const restoreComboElementsAll = (state, sideEffect) => {
  const snorkelPrcUpd = snorkelRestoreCombo( state, sideEffect );
  return snorkelPrcUpd;
};

// Changes to the general state if one state changes
export const getSideEffect = (nm, val, state) => {
  const snorkelSideEffect = getSnorkelSideEffect( nm, val, state );
  return snorkelSideEffect;
};

const Dolphin = ( {dolphininfo, updateDolphininfo, updateEventFees} ) => {
  if (dolphininfo === undefined) return null;

  const onChange = nm => e => {
    const val = e.target.value;
    const sideEffect = getSideEffect( nm, e.target.value, dolphininfo );
    updateDolphininfo( draft => { Object.assign( draft, { [nm]: val }, sideEffect ); } );

    const sideEffectPrcUpd = Object.fromEntries( Object.keys( sideEffect ).map( k => {
      return [ k, prices[k] && prices[k][sideEffect[k]] ];
    } ) );

    // if going from combo to non-combo, restore prices of everything
    var comboPrcUpd = restoreComboElementsAll( dolphininfo, sideEffect );

    // defaults up front.  overrides in the back.
    const priceUpdate = { ...comboPrcUpd, [nm]: prices[nm] && prices[nm][val], ...sideEffectPrcUpd };

    updateEventFees( draft => {
      Object.assign( draft, priceUpdate );
      Object.keys( draft ).forEach( k => { if ( draft[k] === undefined ) delete draft[k] } );
      clearComboAll( draft );
    } );
  };

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
