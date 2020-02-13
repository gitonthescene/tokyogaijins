import React, {useCallback} from 'react';
import { useImmer } from "use-immer";

import Button from '@material-ui/core/Button';

import EventSelect from './EventSelect';
import EventOptions from './EventOptions';
import ContactDetails, { contactDetails_def } from './ContactDetails';
import { NativeContext } from './components/MenuItem';

import {mobileAndTabletcheck} from './utils';

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
  cost *= event.contact.count;
  Object.entries( event.fees ).forEach( ([_,fees]) => {
    fees.forEach(indivFees => {
      Object.entries(indivFees).forEach( ([_,fee]) => { cost += fee; } );
    } );
  } );

  const native=mobileAndTabletcheck();
  return (
    <NativeContext.Provider value={native}>
      <div className="App">
        <div id="content" style={{width:'80%'}}>
          <h3>COST:</h3>
	      <div className="page-content">
            {cost.toFixed(0).replace(/\d(?=(\d{3})+(\.|$))/g, '$&,')} yen
          </div>
        </div>
        <div id="content" style={{width:'80%'}}>
          <h3>Event Details</h3>
	      <div className="page-content">
            <EventSelect
              eventinfo={event.event}
              updateEventinfo={updateEventinfo}
            />
          </div>
        </div>
        <div id="content" style={{width:'80%'}}>
          <h3>Contact Details</h3>
	      <div className="page-content">
            <ContactDetails
              contactinfo={event.contact}
              updateContactinfo={updateContactinfo}
            />
          </div>
        </div>
        <div id="content" style={{width:'80%'}}>
          <EventOptions
            eventType={event.event.type}
            eventinfo={event}
            updateEventOptions={updateEvent}
            updateEventFees={updateEventFees}
            cnt={event.contact.count}
          />
        </div>
        <Button
          name="display"
          variant='contained'
          onClick={ e=> console.log(JSON.stringify(event, undefined, 2))}>
          click me
        </Button>
      </div>
    </NativeContext.Provider>
  );
}

export default App;
