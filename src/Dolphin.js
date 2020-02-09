import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { YesNo, swimmingskillOpts, bodysizeOpts, shoesizeOpts } from './constants';

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

export const dolphininfo_def = () => {return {
  swimming: '',
  height: '',
  weight: '',
  bodysize: '',
  shoesize: '',
  wetsuit: '',
  snorkelkit: '',
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

const Dolphin = ( {dolphininfo, updateDolphininfo} ) => {
  if (dolphininfo === undefined) return null;

  const onChange = nm => e => {
    const val = e.target.value;
    updateDolphininfo( draft => { Object.assign( draft, { [nm]: val } ); } );
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
        nm='bodysize'
        items={bodysizeOpts}
        value={dolphininfo.bodysize}
        label="Body size"
        onChange={onChange('bodysize')}
      />
      <Choice
        nm='shoesize'
        items={shoesizeOpts}
        value={dolphininfo.shoesize}
        label="Shoe size (in JPN)"
        onChange={onChange('shoesize')}
      />
      <Choice
        nm='wetsuit'
        items={YesNo}
        value={dolphininfo.wetsuit}
        label="Wetsuit (2,000yen), L+ size (3,000yen)"
        comment="How does this work?  Does it use body size above?"
        onChange={onChange('wetsuit')}
      />
      <Choice
        nm='snorkelkit'
        items={YesNo}
        value={dolphininfo.snorkelkit}
        label="Snorkelling kit set [Snorkel & mask, Fins & Boots]"
        comment="This should select the two choices below"
        onChange={onChange('snorkelkit')}
      />
      <Choice
        nm='snorkelmask'
        items={YesNo}
        value={dolphininfo.snorkelmask}
        label="Snorkel and mask only"
        onChange={onChange('snorkelmask')}
      />
      <Choice
        nm='fins'
        items={YesNo}
        value={dolphininfo.fins}
        label="Fins only"
        onChange={onChange('fins')}
      />
      <Choice
        nm='boots'
        items={YesNo}
        value={dolphininfo.boots}
        label="Boots only"
        comment="FIXME What does this have to do with the shoesize above?"
        onChange={onChange('boots')}
      />
      <Choice
        nm='tent'
        items={YesNo}
        value={dolphininfo.tent}
        label="Tent"
        onChange={onChange('tent')}
      />
      <Choice
        nm='sleepmat'
        items={YesNo}
        value={dolphininfo.sleepmat}
        label="Sleeping mat"
        onChange={onChange('sleepmat')}
      />
      <Choice
        nm='sleepbag'
        items={YesNo}
        value={dolphininfo.sleepbag}
        label="Sleeping bag"
        onChange={onChange('sleepbag')}
      />
      <Choice
        nm='snorkellesson'
        items={YesNo}
        value={dolphininfo.snorkellesson}
        label="Snorkeling lesson"
        onChange={onChange('snorkellesson')}
      />
      <Choice
        nm='sightseeing'
        items={YesNo}
        value={dolphininfo.sightseeing}
        label="Sightseeing"
        onChange={onChange('sightseeing')}
      />
      <Choice
        nm='scuba'
        items={YesNo}
        value={dolphininfo.scuba}
        label="Scuba Dive Option"
        onChange={onChange('scuba')}
      />
    </div>
  );
};

export default Dolphin;
