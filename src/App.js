import React, {useCallback} from 'react';
import EventSelect from './EventSelect';
import EventOptions from './EventOptions';
import ContactDetails, { contactDetails_def } from './ContactDetails';
import { useImmer } from "use-immer";

const event_default = {
  e_id: '',
};

function App() {
  const [event, updateEvent] = useImmer( {event: event_default, contact: contactDetails_def(), opts: {} } );

  const updateSubField = useCallback(
    key => cb => { updateEvent( draft => { cb(draft[key]); } ); },
    [ updateEvent ]
  );

  // Using immer and useCallback here because we want to set state in useEffect for setEventOptions
  const updateEventinfo = useCallback( updateSubField('event'), [updateSubField] );
  const updateContactinfo = useCallback( updateSubField('contact'), [updateSubField] );
  const updateEventOptions = useCallback( updateSubField('opts'), [updateSubField] );

  return (
    <div className="App">
      <EventSelect
        eventinfo={event.event}
        updateEventinfo={updateEventinfo}
      />
      <ContactDetails
        contactinfo={event.contact}
        updateContactinfo={updateContactinfo}
      />
      <EventOptions
        eventType={event.event.type}
        eventinfo={event}
        updateEventOptions={updateEventOptions}
      />
    </div>
  );
}

export default App;
