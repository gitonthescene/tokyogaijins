// @flow
import React, {useCallback, useEffect} from 'react';

import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import json2mq from 'json2mq';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import EventSelect from './EventSelect';
import EventOptions from './EventOptions';
import ContactDetails, { contactDetails_def } from './ContactDetails';
import CondDisplay from './components/CondDisplay';
import Entry from './components/Entry';
import { buttonSize } from './Payment';

import { debug as DEBUG } from './config.json';
import { COMMENT_MAX_LENGTH } from './constants';
import { renderMail } from './ConfirmationMail';
import { borderOnErrors, logSignup, postMail, isBooked } from './utils';

const event_def = () => {return {
  e_id: '',
  count: '0',
  max: '0',
}};

const ConsentXbox = ({state, toggleCheck, register, errors}) => {
  return (
    <div style={borderOnErrors('consent', errors)}>
    <FormControlLabel
      control={
        <Checkbox
          checked={state}
          onChange={toggleCheck}
          value="consent"
          color="primary"
          name="consent"
          inputRef={register({required: true})}
          />
      }
      label="I have read and understand the terms and conditions linked above"
    />
    </div>
  );
};

export const defaults = () => {return {
  event: event_def(),
  contact: contactDetails_def(),
  fees: {},
  other: {comments:'', consent: false}
};};


const Reservation = ({openDialog, event, updateEvent}) => {
  // const [event, updateEvent] = useImmer( defaults() );
  const { register, handleSubmit, errors, formState } = useForm();

  const booked = isBooked(event);
  const history = useHistory();
  const matches = useMediaQuery( json2mq({minWidth:750}) );

  const updateSubField = useCallback(
    key => cb => { updateEvent( draft => { cb(draft[key]); } ); },
    [ updateEvent ]
  );

  // Using immer and useCallback here because we want to set state in useEffect for setEventOptions
  const updateEventinfo = useCallback( updateSubField('event'), [updateSubField] );
  const updateContactinfo = useCallback( updateSubField('contact'), [updateSubField] );
  const updateEventFees = useCallback( updateSubField('fees'), [updateSubField] );
  const updateOther = useCallback( updateSubField('other'), [updateSubField] );

  useEffect( () => {
    if ( formState.isValid ) {
      event.other.paypalactions && event.other.paypalactions.enable();
    } else if ( event.other.paypalactions ) {
      event.other.paypalactions && event.other.paypalactions.disable();
    }
  },[event.other.paypalactions, formState.isValid]);

  const updateComments = e => {
    const val = e.target.value;
    updateOther( draft => { if ( val.length < COMMENT_MAX_LENGTH ) draft.comments=val; } );
  };

  const updateConsent = e => {
    const val = e.target.checked;
    updateOther( draft => { draft.consent=val; } );
  };

  var cost = event.event.price ? parseInt( event.event.price ) : 0;
  cost *= event.contact.count;
  Object.entries( event.fees ).forEach( ([_,fees]) => {
    fees.forEach(indivFees => {
      Object.entries(indivFees).forEach( ([_,fee]) => { cost += fee; } );
    } );
  } );

  const bookIt = name => () => {
    console.log( "Booking" );
    return logSignup( event, booked )
      .then( () => {
        postMail( event, renderMail );
        // Clear out event info
        updateEvent( draft => defaults() );
      })
      .catch( e => {
        console.log( "Trouble with " + name + ":" + e.message );
      });
  };

  const validateForm = () => {
    // Check if validated, if not say so
    // validation should enable paypalactions
    handleSubmit(() => {})();
  };

  const toPayment = () => {
    history.push( "/payment" );
  };
  return (
    <>
      <div className="App">
        <div id="content" style={{width:'80%', marginTop:'20px'}}>
          <h1>Event Reservation Form</h1>
	      <div className="page-content">
            Please fill out the form below with your details. Only your nickname or first name
            will be shared with other participants for the same event. All other information
            provided will be treated strictly confidential and only used for emergency,
            insurance and/or statistical purposes.
            <CondDisplay showif={booked && event.event.e_id}>
	          <div style={{border:'solid',
                           fontStyle:'italic',
                           borderColor:'red',
                           fontSize:'18px',
                           textAlign:'center',
                           margin:'10px',
                           padding:'5px'}}>
                This event is currently full.  Please fill out the information below to get
                on the waiting list.
              </div>
            </CondDisplay>
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
              register={register}
              errors={errors}
            />
            <div style={{textAlign:'center'}}>
              <CondDisplay showif={booked && event.event.e_id}>
                <Button
                  name="display"
                  variant='contained'
                  onClick={handleSubmit(bookIt("waitlist"))}
                  size="large"
                  color="primary"
                  style={{margin:'5px', width:'50%', ...buttonSize(matches)}}>
                  Join Wait list
                </Button>
              </CondDisplay>
            </div>
          </div>
        </div>
        <CondDisplay showif={!booked}>
          <div id="content" style={{width:'80%'}}>
            <EventOptions
              eventType={event.event.type}
              eventinfo={event}
              updateEventOptions={updateEvent}
              updateEventFees={updateEventFees}
              cnt={event.contact.count}
              register={register}
              errors={errors}
              validateForm={validateForm}
            />
          </div>
          <div id="content" style={{width:'80%'}}>
            <h3>Other</h3>
	        <div className="page-content">
              <div style={{display:'flex', flexFlow:'column', padding: '5px', margin:'5px'}}>
                <Entry
                  label="Other requests / Comments / Group leader name (multiple lines ok)"
                  value={event.other.comments}
                  onChange={updateComments}
                  multiline={true}
                />
                <div style={{margin:'50px 0 10px 0'}}>
                  <a href="/tour-conditions.php" target="_blank">Tokyo Gaijins' Tour Conditions</a>
                </div>
                <ConsentXbox
                  state={event.other.consent}
                  toggleCheck={updateConsent}
                  register={register}
                  errors={errors}
                />
              </div>
            </div>
          </div>
          <div id="content" style={{width:'80%'}}>
            <h3>Total:</h3>
	        <div className="page-content" style={{textAlign:'center'}}>
              <div style={{border:'solid', margin:'10px'}}>
                {cost.toFixed(0).replace(/\d(?=(\d{3})+(\.|$))/g, '$&,')} yen
              </div>
              <CondDisplay showif={cost}>
                <Button
                  name="display"
                  variant='contained'
                  onClick={handleSubmit(toPayment)}>
                  Pay
                </Button>
              </CondDisplay>
            </div>
          </div>
        </CondDisplay>
        <CondDisplay showif={DEBUG === "true"}>
          <Button
            name="display"
            variant='contained'
            onClick={ e => { console.log( renderMail(event) ); console.log( event ); }}>
            click me
          </Button>
        </CondDisplay>
      </div>
    </>
  );
};

export default Reservation;
