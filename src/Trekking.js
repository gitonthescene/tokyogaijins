import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { roomOptsByEvent, YesNo } from './constants';
import Room, { room_def } from './Room';

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
      var samePrice = true;
      prices.forEach( p => { samePrice = samePrice && price[p] === price[prices[0]]; } );
      if ( samePrice ) {
        pricedisplay = `${price[prices[0]]} yen`;
      } else {
        pricedisplay = prices.map( k => `${k}: ${price[k]} yen` ).join( ", " );
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

export const trekking_def = () => {
  const room = room_def();
  return {
    Happoike: 'No',
    Tsugaike: 'No',
    Tateyama: 'No',
    ...room
  };
};

const prices = {};

const Trekking = ( {trekkinginfo, updateTrekkinginfo, updateEventFees} ) => {
  if (trekkinginfo === undefined) return null;

  const onChange = nm => e => {
    const val = e.target.value;
    updateTrekkinginfo( draft => { Object.assign( draft, { [nm]: val } ); } );

    if ( prices[nm] && prices[nm][val] ) {
      updateEventFees( draft => { Object.assign( draft, { [nm]: prices[nm][val] } ); } );
    }
    else {
      // if setting val to a non-price, make sure there's no key
      updateEventFees( draft => { delete draft[nm]; } );
    }
  };

  return (
    <div style={{display:'flex', flexFlow:'column', borderStyle:'solid', padding: '5px', margin:'5px'}}>
      <Choice
        nm='room'
        items={YesNo}
        value={trekkinginfo.Happoike}
        label="Happoike"
        onChange={onChange('Happoike')}
      />
      <Choice
        nm='room'
        items={YesNo}
        value={trekkinginfo.Tsugaike}
        label="Tsugaike"
        onChange={onChange('Tsugaike')}
      />
      <Choice
        nm='room'
        items={YesNo}
        value={trekkinginfo.Tateyama}
        label="Tateyama"
        onChange={onChange('Tateyama')}
      />
      <Room
        roominfo={trekkinginfo}
        updateRoominfo={updateTrekkinginfo}
        tentOrRoom='Room'
        roomOpts={roomOptsByEvent.H}
      />
    </div>
  );
};

export default Trekking;
