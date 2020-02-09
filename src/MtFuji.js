import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { YesNo, hikingshoesizeOpts, jacketpantsizeOpts, gaitersizeOpts } from './constants';

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

const MtFuji = ( {myfujiinfo, setMyfujiinfo} ) => {
  const onChange = nm => e => {
    const newval = Object.assign( {}, myfujiinfo, { [nm]: e.target.value } );
    setMyfujiinfo( newval );
  };
  return (
    <div style={{display:'flex', flexFlow:'column', borderStyle:'solid', padding: '5px', margin:'5px'}}>
      <Choice
        nm='guide'
        items={YesNo}
        value={myfujiinfo.guide}
        label="Mt. Fuji Certified Hike Guide"
        onChange={onChange('guide')}
      />
      <Choice
        nm='full'
        items={YesNo}
        value={myfujiinfo.full}
        label="Rain jacket/pants set, gaiters, trekking shoes, backpack (30L), backpack rain cover, trekking poles and headlamp"
        onChange={onChange('full')}
      />
      <Choice
        nm='jacketpants'
        items={jacketpantsizeOpts}
        value={myfujiinfo.jacketpants}
        label="Rain jacket and pants *Gore-Tex technology or equivalent"
        onChange={onChange('jacketpants')}
      />
      <Choice
        nm='shoes'
        items={hikingshoesizeOpts}
        value={myfujiinfo.shoes}
        label="Hiking/trekking shoes *Gore-Tex technology or equivalent"
        onChange={onChange('shoes')}
      />
      <Choice
        nm='backpack'
        items={YesNo}
        value={myfujiinfo.backpack}
        label="Backpack with rain cover"
        onChange={onChange('backpack')}
      />
      <Choice
        nm='poles'
        items={YesNo}
        value={myfujiinfo.poles}
        label="Hiking/trekking poles"
        onChange={onChange('poles')}
      />
      <Choice
        nm='headlamp'
        items={YesNo}
        value={myfujiinfo.headlamp}
        label="Headlamp"
        onChange={onChange('headlamp')}
      />
      <Choice
        nm='gaiters'
        items={gaitersizeOpts}
        value={myfujiinfo.gaiters}
        label="Gaiters"
        onChange={onChange('gaiters')}
      />
    </div>
  );
};

export default MtFuji;
