import React from 'react';

import CondDisplay from './components/CondDisplay';
import Entry from './components/Entry';
import Choice from './components/Choice';

import { sexes } from './constants';
import { borderOnErrors, requiredLabel } from './utils';

const PersonalDetails = ({personalinfo, updatePersonalinfo, register, errors}) => {
  if ( personalinfo === undefined ) return null;
  const onChange = nm => e => {
    const val = e.target.value;
    updatePersonalinfo( draft => { Object.assign( draft, { [nm]: val } ); } );
  };

  return (
    <div style={{display:'flex', flexFlow:'column', padding: '5px', margin:'5px'}}>
      <CondDisplay showif={true}>
        <Entry
          label={requiredLabel("Name", errors)}
          value={personalinfo.name}
          onChange={onChange('name')}
          name="personal:name"
          inputRef={register({required: true})}
          style={borderOnErrors('personal:name', errors)}
        />
        <Choice
          nm='sex'
          items={sexes}
          value={personalinfo.sex}
          label="Sex"
          onChange={onChange('sex')}
        />
        <Entry
          label={requiredLabel("Age", errors)}
          value={personalinfo.age}
          onChange={onChange('age')}
          name="personal:age"
          type="number"
          inputRef={register({required: true})}
          style={borderOnErrors('personal:age', errors)}
        />
        <Entry
          value={personalinfo.cellphone}
          label={requiredLabel("Cellphone", errors)}
          onChange={onChange('cellphone')}
          name="personal:cellphone"
          inputRef={register({required: true, pattern:/^\d+$/, maxLength:12})}
          style={borderOnErrors('personal:cellphone', errors)}
        />
        <Entry
          value={personalinfo.email}
          label="Email"
          onChange={onChange('email')}
          name="personal:email"
          inputRef={register({required: true, pattern:/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/, maxLength:128})}
          style={borderOnErrors('personal:email', errors)}
        />
      </CondDisplay>
    </div>
  );
};

export default PersonalDetails;
