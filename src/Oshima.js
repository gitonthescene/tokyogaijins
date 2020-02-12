import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { YesNo, roomOptsByEvent } from './constants';
import Room, { room_def } from './Room';

export const oshima_def = () => {
  const room = room_def();
  return {
    ...room
  };
};

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
  trekking: { 'Yes': 2500 },
  bike: { 'Yes': 2000 },
  helmet: { 'Yes': 500 },
};

const Oshima = ( {oshimainfo, updateOshimainfo, updateEventFees} ) => {
  if (oshimainfo === undefined) return null;

  const onChange = nm => e => {
    const val = e.target.value;
    updateOshimainfo( draft => { Object.assign( draft, { [nm]: val } ); } );

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
        nm='trekking'
        items={YesNo}
        value={oshimainfo.trekking}
        label="Mt. Mihara trekking"
        onChange={onChange('trekking')}
        price={prices.trekking}
      />
      <Choice
        nm='bike'
        items={YesNo}
        value={oshimainfo.bike}
        label="Mountain bike rental"
        onChange={onChange('bike')}
        price={prices.bike}
      />
      <Choice
        nm='helmet'
        items={YesNo}
        value={oshimainfo.helmet}
        label="Helmet rental"
        onChange={onChange('helmet')}
        price={prices.helmet}
      />
      <Room
        roominfo={oshimainfo}
        updateRoominfo={updateOshimainfo}
        tentOrRoom='Room'
        roomOpts={roomOptsByEvent.I}
      />
    </div>
  );
};

export default Oshima;
