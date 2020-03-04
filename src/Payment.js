import React from 'react';

import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import json2mq from 'json2mq';

import PayPalButton from './PayPal';
import ConfirmationMail, { renderMail } from './ConfirmationMail';
import { logSignup, postMail, isBooked } from './utils';
import { baseurl as BASEURL } from './config.json';
import { calcDiscount } from './Reservation';

const bookAndRedirect = (name, redirect, state, openDialog) => () => {
  const booked = isBooked( state );
  return logSignup( state, booked )
    .then( () => postMail( state, renderMail ) )
    .then( () => {
      openDialog( "Please follow instructions for payment", redirect );
    })
    .catch( e => {
      console.log( "Trouble with " + name + ":" + e.message );
    });
};

export const buttonSize = matches => matches ? {minWidth:'500px', maxWidth:'750px'} : {minWidth:'200px', maxWidth:'750px'};

const Payment = ({event, onApprove, openDialog}) => {
  const matches = useMediaQuery( json2mq({minWidth:750}) );

  // Calculate the cost based on the event with a function which takes discounts into consideration

  var cost = calcDiscount( event );

  return (
    <>
      <div id="content" style={{width:'80%'}}>
        <h3>Confirmation:</h3>
	    <div className="page-content" style={{textAlign:'center'}}>
          <div style={{margin:'10px'}}>
            <ConfirmationMail state={event}/>
          </div>
          <h5>Total:</h5>
          <div style={{border:'solid', margin:'10px'}}>
            {cost.toFixed(0).replace(/\d(?=(\d{3})+(\.|$))/g, '$&,')} yen
          </div>
        </div>
      </div>

      <div id="content" style={{width:'80%', marginTop:'20px'}}>
        <h1>Payment</h1>
	    <div className="page-content" style={{textAlign:'center'}}>
          <PayPalButton
            cost={cost}
            onApprove={onApprove}
          />
          <Button
            name="display"
            variant='contained'
            onClick={bookAndRedirect("banktransfer", BASEURL+"/payment.php", event, openDialog)}
            size="large"
            color="primary"
            style={{margin:'5px', width:'50%', ...buttonSize(matches)}}>
            Bank transfer
          </Button><br/>
          <Button
            name="display"
            variant='contained'
            onClick={bookAndRedirect("atmtransfer", BASEURL+"/cash-thru-atm.php", event, openDialog)}
            size="large"
            color="primary"
            style={{margin:'5px', width:'50%', ...buttonSize(matches)}}>
            ATM payment
          </Button>
        </div>
      </div>
    </>
  );
};

export default Payment;
