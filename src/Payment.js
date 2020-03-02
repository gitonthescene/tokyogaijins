import React from 'react';

import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import json2mq from 'json2mq';

import PayPalButton from './PayPal';
import { renderMail } from './ConfirmationMail';
import { logSignup, postMail } from './utils';
import { baseurl as BASEURL } from './config.json';

const bookAndRedirect = (name, redirect, state, booked, openDialog) => () => {
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

const Payment = ({cost, onApprove}) => {
  const matches = useMediaQuery( json2mq({minWidth:750}) );

  return (
    <>
      <PayPalButton
        cost={cost}
        onApprove={onApprove}
      />
      <Button
        name="display"
        variant='contained'
        onClick={bookAndRedirect("waitlist", BASEURL+"/payment.php")}
        size="large"
        color="primary"
        style={{margin:'5px', width:'50%', ...buttonSize(matches)}}>
        Bank transfer
      </Button><br/>
      <Button
        name="display"
        variant='contained'
        onClick={bookAndRedirect("waitlist", BASEURL+"/cash-thru-atm.php")}
        size="large"
        color="primary"
        style={{margin:'5px', width:'50%', ...buttonSize(matches)}}>
        ATM payment
      </Button>
    </>
  );
};

export default Payment;
