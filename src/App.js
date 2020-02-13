import React, {useCallback} from 'react';
import { useImmer } from "use-immer";

import Button from '@material-ui/core/Button';

import EventSelect from './EventSelect';
import EventOptions from './EventOptions';
import ContactDetails, { contactDetails_def } from './ContactDetails';

const event_default = {
  e_id: '',
};

function App() {
  const [event, updateEvent] = useImmer( {event: event_default, contact: contactDetails_def(), fees: {} } );

  const updateSubField = useCallback(
    key => cb => { updateEvent( draft => { cb(draft[key]); } ); },
    [ updateEvent ]
  );

  // Using immer and useCallback here because we want to set state in useEffect for setEventOptions
  const updateEventinfo = useCallback( updateSubField('event'), [updateSubField] );
  const updateContactinfo = useCallback( updateSubField('contact'), [updateSubField] );
  const updateEventFees = useCallback( updateSubField('fees'), [updateSubField] );

  var cost = event.event.price ? parseInt( event.event.price ) : 0;
  Object.entries( event.fees ).forEach( ([_,fees]) => {
    fees.forEach(indivFees => {
      Object.entries(indivFees).forEach( ([_,fee]) => { cost+=fee; } );
    } );
  } );

  return (
    <div className="App">
      <EventSelect
        eventinfo={event.event}
        updateEventinfo={updateEventinfo}
      />
      <div style={{display:'flex', flexFlow:'row', width:'40%', borderStyle:'solid', padding: '5px', margin:'5px'}}>
    <span style={{margin:'0 10px', fontStyle: 'italic'}}>COST:</span><span>{cost}</span>
      </div>
      <ContactDetails
        contactinfo={event.contact}
        updateContactinfo={updateContactinfo}
      />
      <EventOptions
        eventType={event.event.type}
        eventinfo={event}
        updateEventOptions={updateEvent}
        updateEventFees={updateEventFees}
        cnt={event.contact.count}
      />
      <Button
        name="display"
        variant='contained'
        onClick={ e=> console.log(JSON.stringify(event, undefined, 2))}>
        click me
      </Button>
    </div>
  );
}

export default App;
