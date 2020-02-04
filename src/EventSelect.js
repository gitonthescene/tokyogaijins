import React, { useState, useEffect } from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import {baseurl as BASEURL} from './config.json';

const Choice = ({nm, label, items, value, ...props}) => {
  const listitems = items.filter( itm => itm.type === "C" || itm.type === "S"|| itm.type === "G" ).map( itm =>  (
    <MenuItem value={itm.e_id} key={itm.e_id} {...props}>
      {itm.name}
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

const fetchres = ( req ) => {
  return fetch(BASEURL + req,
               {credentials: 'include'}
              )
    .then(
      (response)=> {
        if ( response.ok ) return response.json();
        throw new Error( 'Network response was not ok for '+req+'.' );
      }
    );
};

const EventSelect = ( {eventinfo, updateEventinfo} ) => {
  const [ events, setEvents ] = useState([]);
  const eventsByID = Object.fromEntries( events.map( itm => [itm.e_id, itm] ) );
  useEffect( () => {
    fetchres( "/php/fetchevents.php" ).then(
      data => { setEvents( data ); }
    );
  }, [ setEvents ]);
  
  return (
    <div style={{display:'flex', flexFlow:'column', width:'40%', borderStyle:'solid', padding: '5px', margin:'5px'}}>
      <Choice
        nm='id'
        items={events}
        value={eventinfo.e_id}
        onChange={e => { updateEventinfo( draft => { Object.assign( draft, eventsByID[ e.target.value ] );  } );}}
        label="Event Date and Name"
      />
    </div>
  );
};

export default EventSelect;
