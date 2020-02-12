import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { YesNo } from './constants';

export const fuji_def = () => {return {
  guide_hike: 'No (hike at your own risk)',
  fullset: 'No',
  rainjacketpants: 'No',
  hikingshoes: 'No',
  backpackcover: 'No',
  hikingpoles: 'No',
  headlamp: 'No',
  gaiters: 'No',
};};

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

const prices = {
  fullset: { 'Yes': 9500 },
  rainjacketpants: { 'Yes': 3500 },
  hikingshoes: { 'Yes': 3500 },
  backpackcover: { 'Yes': 3500 },
  hikingpoles: { 'Yes': 2500 },
  headlamp: { 'Yes': 1000 },
  gaiters: { 'Yes': 1000 },
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

const hikingClearCombo = clearCombo( 'fullset', [ 'rainjacketpants', 'backpackcover', 'gaiters', 'hikingshoes', 'hikingpoles', 'headlamp' ] );
const hikingRestoreCombo = restoreComboElements( 'fullset', [ 'rainjacketpants', 'backpackcover', 'gaiters', 'hikingshoes', 'hikingpoles', 'headlamp' ] );
const getHikingSideEffect = calcComboSideEffect( 'fullset', [ 'rainjacketpants', 'backpackcover', 'gaiters', 'hikingshoes', 'hikingpoles', 'headlamp' ] );

export const clearComboAll = draft => {
  hikingClearCombo( draft );
};

export const restoreComboElementsAll = (state, sideEffect) => {
  const hikingPrcUpd = hikingRestoreCombo( state, sideEffect );
  return hikingPrcUpd;
};

// Changes to the general state if one state changes
export const getSideEffect = (nm, val, state) => {
  const hikingSideEffect = getHikingSideEffect( nm, val, state );
  return hikingSideEffect;
};

const Fuji = ( {fujiinfo, updateFujiinfo, updateEventFees} ) => {
  if (fujiinfo === undefined) return null;

  const onChange = nm => e => {
    const val = e.target.value;
    const sideEffect = getSideEffect( nm, e.target.value, fujiinfo );
    updateFujiinfo( draft => { Object.assign( draft, { [nm]: val }, sideEffect ); } );

    const sideEffectPrcUpd = Object.fromEntries( Object.keys( sideEffect ).map( k => {
      return [ k, prices[k] && prices[k][sideEffect[k]] ];
    } ) );

    // if going from combo to non-combo, restore prices of everything
    var comboPrcUpd = restoreComboElementsAll( fujiinfo, sideEffect );

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
        nm='guide_hike'
    items={['Yes', 'No (hike at your own risk)']}
        value={fujiinfo.guide_hike}
        label="Mt. Fuji Certified Hike Guide"
        onChange={onChange('guide_hike')}
        price={prices.guide_hike}
      />
      <Choice
        nm='fullset'
        items={YesNo}
        value={fujiinfo.fullset}
        label="Fullset"
        onChange={onChange('fullset')}
        price={prices.fullset}
      />
      <CondDisplay
        showif={fujiinfo.fullset==='No'}
        comment="If using CondDisplay, then you can't unchoose after selecting all">
        <div style={{display:'flex', flexFlow:'column', marginLeft: '10px'}}>
          <Choice
            nm='rainjacketpants'
            items={YesNo}
            value={fujiinfo.rainjacketpants}
            label="Rain jacket and pants *Gore-Tex technology or equivalent"
            onChange={onChange('rainjacketpants')}
            price={prices.rainjacketpants}
          />
          <Choice
            nm='hikingshoes'
            items={YesNo}
            value={fujiinfo.hikingshoes}
            label="Hiking/trekking shoes *Gore-Tex technology or equivalent"
            onChange={onChange('hikingshoes')}
            price={prices.hikingshoes}
          />
          <Choice
            nm='backpackcover'
            items={YesNo}
            value={fujiinfo.backpackcover}
            label="Backpack with rain cover"
            onChange={onChange('backpackcover')}
            price={prices.backpackcover}
          />
          <Choice
            nm='hikingpoles'
            items={YesNo}
            value={fujiinfo.hikingpoles}
            label="Hiking/trekking poles"
            onChange={onChange('hikingpoles')}
            price={prices.hikingpoles}
          />
          <Choice
            nm='headlamp'
            items={YesNo}
            value={fujiinfo.headlamp}
            label="Headlamp"
            onChange={onChange('headlamp')}
            price={prices.headlamp}
          />
          <Choice
            nm='gaiters'
            items={YesNo}
            value={fujiinfo.gaiters}
            label="Gaiters"
            onChange={onChange('gaiters')}
            price={prices.gaiters}
          />
        </div>
      </CondDisplay>
    </div>
  );
};

export default Fuji;
