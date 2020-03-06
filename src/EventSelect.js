import React, { useState, useEffect, useContext } from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
//import MenuItem from '@material-ui/core/MenuItem';
import MenuItem, {NativeContext} from './components/MenuItem';

import {fetchres} from './utils';

const Choice = ({nm, label, items, value, ...props}) => {
//  const listitems = items.filter( itm => itm.type === "C"  ).map( itm =>  (
  const listitems = items.map( itm =>  (
    <MenuItem value={itm.e_id} key={itm.e_id} {...props}>
      {itm.name} {itm.type}
    </MenuItem>
  ) );
  listitems.unshift( <MenuItem value='' key=''>&nbsp;</MenuItem> );
  const NATIVE = useContext( NativeContext );

  return (
      <FormControl>
        <InputLabel htmlFor={'choice'+nm}>{label}</InputLabel>
        <Select
          native={NATIVE}
          id={'choice'+nm}
          value={value}
          {...props}
        >
          {listitems}
        </Select>
      </FormControl>
  );
};

const EventSelect = ( {eventinfo, updateEventinfo} ) => {
  const [ events, setEvents ] = useState([{e_id:eventinfo.e_id}]);
  const eventsByID = Object.fromEntries( events.map( itm => [itm.e_id, itm] ) );
  eventsByID[''] = {e_id:''};
  useEffect( () => {
    fetchres( "/php/fetchevents.php" ).then(
      data => { setEvents( data ) }
    );
  }, [ setEvents ]);

  return (
    <div style={{display:'flex', flexFlow:'column', padding: '5px', margin:'5px'}}>
      <Choice
        nm='id'
        items={events}
        value={eventinfo.e_id}
        onChange={e => { const val=e.target.value; updateEventinfo( draft => { Object.assign( draft, eventsByID[ val ] );  } );}}
        label="Event Date and Name"
      />
    </div>
  );
};

export default EventSelect;
