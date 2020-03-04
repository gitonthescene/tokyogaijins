import React, {useContext} from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
//import MenuItem from '@material-ui/core/MenuItem';
import MenuItem, {NativeContext} from './MenuItem';

import CondDisplay from './CondDisplay';
import { prettyMoney } from '../utils';

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
      pricedisplay = `${prettyMoney(price[prices[0]])} yen`;
    } else if ( prices.length > 1 ) {
      var samePrice = true;
      prices.forEach( p => { samePrice = samePrice && price[p] === price[prices[0]]; } );
      if ( samePrice ) {
        pricedisplay = `${prettyMoney(price[prices[0]])} yen`;
      } else {
        pricedisplay = prices.filter( k => price[k] !== 0 ).map( k => `${k}: ${prettyMoney(price[k])} yen` ).join( ", " );
      };
    };
  };
  const NATIVE = useContext( NativeContext );

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
          native={NATIVE}
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

export default Choice;
