import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { YesNo } from './constants';

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

const SkyDiving = ( {skydivinginfo, setSkydivinginfo} ) => {
  const onChange = nm => e => {
    const newval = Object.assign( {}, skydivinginfo, { [nm]: e.target.value } );
    setSkydivinginfo( newval );
  };
  return (
    <div style={{display:'flex', flexFlow:'column', width:'40%', borderStyle:'solid', padding: '5px', margin:'5px'}}>
      <Entry
        label="Your Weight (in kgs)"
        value={skydivinginfo.weight}
        onChange={onChange('weight')}
      />
      <Entry
        label="Your Height (in cm)"
        value={skydivinginfo.height}
        onChange={onChange('height')}
      />
      <Choice
        nm='videoorphoto'
        items={YesNo}
        value={skydivinginfo.videoorphoto}
        label="Video or photos by a separate cameraman"
        onChange={onChange('videoorphoto')}
      />
      <Choice
        nm='videoandphoto'
        items={YesNo}
        value={skydivinginfo.videoandphoto}
        label="Video and photos by a separate cameraman"
        comment="FIXME Better to set this up with a package item like other package items"
        onChange={onChange('videoandphoto')}
      />
      <Choice
        nm='gopro'
        items={YesNo}
        value={skydivinginfo.gopro}
        label="Go-Pro video by instructor"
        onChange={onChange('gopro')}
      />
      <Entry
        label="Other requests/Comments/Group leader name"
        value={skydivinginfo.requests}
        onChange={onChange('requests')}
        comment="FIXME why are these three packed into one?"
      />
      <TermsAndConditions/>
    </div>
  );
};

export default SkyDiving;
