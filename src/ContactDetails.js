import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { sexes, nationalities } from './constants';


export const contactDetails_def = () => {return {
  fullname: '',
  sex: '',
  nationality: '',
  cellphone: '',
  email: '',
  count: 1,
}};

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

const ContactDetails = ( {contactinfo, updateContactinfo} ) => {
  const onChange = nm => e => {
    const val = e.target.value;
    updateContactinfo( draft => {Object.assign( draft, { [nm]: val }); } );
  };
  return (
    <div style={{display:'flex', flexFlow:'column', width:'40%', borderStyle:'solid', padding: '5px', margin:'5px'}}>
      <Entry
        label="First and last name"
        value={contactinfo.fullname}
        onChange={onChange('fullname')}
      />
      <Choice
        nm='sex'
        items={sexes}
        value={contactinfo.sex}
        label="Sex"
        onChange={onChange('sex')}
      />
      <Choice
        nm='nationality'
        items={nationalities}
        value={contactinfo.nationality}
        label="Nationality"
        onChange={onChange('nationality')}
      />
      <Entry
        value={contactinfo.cellphone}
        label="Cellphone"
        onChange={onChange('cellphone')}
      />
      <Entry
        value={contactinfo.email}
        label="Email"
        onChange={onChange('email')}
      />
      <Choice
        nm='count'
        items={[1,2,3,4,5,6,7,8,9,10]}
        value={contactinfo.count}
        label="Number of people"
        onChange={onChange('count')}
      />
    </div>
  );
};

export default ContactDetails;
