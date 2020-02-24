// @flow
import React, {useCallback, useEffect} from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import PayPalButton from './PayPal';
import { useImmer } from "use-immer";
import json2mq from 'json2mq';
import { useForm } from 'react-hook-form';

import EventSelect from './EventSelect';
import EventOptions from './EventOptions';
import ContactDetails, { contactDetails_def } from './ContactDetails';
import { NativeContext } from './components/MenuItem';
import Header from './Header.js';
import Footer from './Footer.js';
import CondDisplay from './components/CondDisplay';
import Entry from './components/Entry';

import { mobileAndTabletcheck } from './utils';
import { baseurl as BASEURL, debug as DEBUG, clientId as CLIENTID } from './config.json';
import { COMMENT_MAX_LENGTH } from './constants';
import { borderOnErrors } from './utils';
import { renderMail } from './ConfirmationMail';

const event_default = {
  e_id: '',
  count: '0',
  max: '0',
};

const AlertReservedDialog = ({open, close, message}) => {
  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle>Reservation booked.</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

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

const postdata = ( url, formData, args ) => {
  return fetch(url,
               { method: 'POST',
                 mode: 'cors',
                 credentials: 'include',
                 body: formData,
                 ...args
               });
};

const logSignup = (state, booked) => {
  const formData = new FormData();

  formData.append( "e_id", state.event.e_id );
  formData.append( "wl", booked ? "1" : "0");
  formData.append( "evtname", state.event.name );
  formData.append( "fullname", state.contact.fullname );
  formData.append( "count", state.contact.count );
  formData.append( "sex", state.contact.sex === 'Male' ? "0" : "1" );
  formData.append( "comments", state.other.comments );
  formData.append( "age", "0" );
  formData.append( "country", state.contact.nationality );
  formData.append( "email", state.contact.email );
  formData.append( "cellphone", state.contact.cellphone );
  formData.append( "japanAddress", "" );

  return postdata( BASEURL+'/php/react-signup.php', formData );
};

const postMail = ( state ) => {
  const formData = new FormData();

  formData.append( "body", "<pre>\n"+renderMail( state )+"</pre>" );
  formData.append( "e_id", state.event.e_id );
  formData.append( "fullname", state.contact.fullname );
  formData.append( "email", state.contact.email );

  return postdata( BASEURL+'/php/react-mail.php', formData );
};

function App() {
  const defaults = {
    event: event_default,
    contact: contactDetails_def(),
    fees: {},
    other: {comments:'', consent: false, checked: false}
  };

  const [event, updateEvent] = useImmer( defaults );
  const [dstate, updateDstate] = useImmer( { open: false } );
  const matches = useMediaQuery( json2mq({minWidth:750}) );
  const { register, handleSubmit, errors } = useForm();

  const openDialog = (message, redirect) => {
    updateDstate( draft => { return { open: true, message: message, redirect: redirect }; } );
  };

  const closeDialog = () => {
    updateDstate( draft => { return { open: false }; } );
    if ( dstate.redirect ) window.location = dstate.redirect;
  };

  const paypalOptions = {
    clientId: CLIENTID,
    currency: 'JPY'
  };
  const countppl = parseInt(event.event.count);
  const maxppl = parseInt( event.event.max );
  const booked = ! event.event.e_id || ( (maxppl > 0) && (countppl >= maxppl) );

  const native=mobileAndTabletcheck();

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
    if ( event.other.checked && Object.entries( errors ).length === 0 ) {
      event.other.paypalactions && event.other.paypalactions.enable();
    } else if ( event.other.paypalactions ) {
      event.other.paypalactions.disable();
    }
  },[errors, event.other.paypalactions, event.other.checked]);

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
        postMail( event );
        // Clear out event info
        updateEvent( draft => defaults );
      })
      .catch( e => {
        console.log( "Trouble with " + name + ":" + e.message );
      });
  };

  const bookAndRedirect = (name, redirect) => () => {
    return logSignup( event, booked )
      .then( () => postMail( event ) )
      .then( () => {
        openDialog( "Please follow instructions for payment", redirect );
      })
      .catch( e => {
        console.log( "Trouble with " + name + ":" + e.message );
      });
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: cost,
          currency_code: 'JPY'
        }
      }],
      application_context: {
        shipping_preference: "NO_SHIPPING",
      }
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function(details) {
      logSignup( event, booked )
        .then( () => postMail( event ) )
        .then( () => {
          updateEvent( draft => defaults );
          openDialog( "Thank you!" );
        });
    });
  };

  const onPayPalClick = () => {
    // Check if validated, if not say so
    // validation should enable paypalactions
    handleSubmit(() => {})();
  };

  const setPayPalActions = actions => {
    updateOther( draft => { draft.paypalactions = actions; } );
  };

  const buttonSize = matches ? {minWidth:'500px', maxWidth:'750px'} : {minWidth:'200px', maxWidth:'750px'};
  return (
    <>
      <div style={{width:"80%", marginLeft:"auto", marginRight:"auto"}}>
        <Header/>
      </div>
      <div style={{display:'flex', flexFlow:'column', justifyContent: "space-between", width:"100%"}}>
        <NativeContext.Provider value={native}>
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
                      style={{margin:'5px', width:'50%', ...buttonSize}}>
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
                    <PayPalButton
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onClick={onPayPalClick}
                      setPayPalActions={setPayPalActions}
                    />
                    <Button
                      name="display"
                      variant='contained'
                      onClick={handleSubmit(bookAndRedirect("waitlist", BASEURL+"/payment.php"))}
                      size="large"
                      color="primary"
                      style={{margin:'5px', width:'50%', ...buttonSize}}>
                      Bank transfer
                    </Button><br/>
                    <Button
                      name="display"
                      variant='contained'
                      onClick={handleSubmit(bookAndRedirect("waitlist", BASEURL+"/cash-thru-atm.php"))}
                      size="large"
                      color="primary"
                      style={{margin:'5px', width:'50%', ...buttonSize}}>
                      ATM payment
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
        </NativeContext.Provider>
      </div>
      <Footer/>

      <AlertReservedDialog open={dstate.open} close={closeDialog} message={dstate.message}/>
    </>
  );
};

export default App;
