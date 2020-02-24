// @flow
import React from 'react';

import Entry from './components/Entry';
import Choice from './components/Choice';

import { sexes, nationalities } from './constants';
import { borderOnErrors, requiredLabel } from './utils';

export const contactDetails_def = () => {return {
  fullname: '',
  sex: 'Female',
  nationality: '',
  cellphone: '',
  email: '',
  count: 1,
}};

const ContactDetails = ( {contactinfo, updateContactinfo, register, errors} ) => {
  const onChange = nm => e => {
    const val = e.target.value;
    updateContactinfo( draft => {Object.assign( draft, { [nm]: val }); } );
  };

  return (
    <div style={{display:'flex', flexFlow:'column', padding: '5px', margin:'5px'}}>
      <Entry
        label={requiredLabel("First and last name", errors)}
        value={contactinfo.fullname}
        onChange={onChange('fullname')}
        name="fullname"
        inputRef={register({required: true})}
        style={borderOnErrors('fullname', errors)}
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
        label={requiredLabel("Cellphone", errors)}
        onChange={onChange('cellphone')}
        name="cellphone"
        inputRef={register({required: true, pattern:/^\d+$/, maxLength:12})}
        style={borderOnErrors('cellphone', errors)}
      />
      <Entry
        value={contactinfo.email}
        label={requiredLabel("Email", errors)}
        onChange={onChange('email')}
        name="email"
        inputRef={register({required: true, pattern:/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/, maxLength:128})}
        style={borderOnErrors('email', errors)}
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
