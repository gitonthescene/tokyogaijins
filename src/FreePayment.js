import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import json2mq from 'json2mq';

import PayPalButton from './PayPal';
import { buttonSize } from './Payment';
import Entry from './components/Entry';
import { prettyMoney } from './utils';

import { baseurl as BASEURL } from './config.json';

const FreePayment = () => {
  const [cost, setCost] = useState(0);

  const matches = useMediaQuery( json2mq({minWidth:750}) );

  // What to do when payment is successful
  const onApprove = () => {};
  const redirect = url => e => { window.location = url; };

  const onChange = e => {
    const val = e.target.value;
    const num = parseInt( val.replace(/,/g, '') );
    if ( val === "" ) setCost( 0 );
    else if ( !isNaN(num) ) setCost( num );
  };

  return (
    <div id="content" style={{width:'80%', marginTop:'20px'}}>
      <h1>Amount</h1>
	  <div className="page-content" style={{textAlign:'center'}}>
        <Entry
          label="amount in yen"
          onChange={onChange}
          value={prettyMoney(cost)}
        />
      </div>
      <h1>Payment</h1>
	  <div className="page-content" style={{textAlign:'center'}}>
        <PayPalButton
          cost={cost}
          onApprove={onApprove}
        />
        <Button
          name="display"
          variant='contained'
          onClick={redirect(BASEURL+"/payment.php")}
          size="large"
          color="primary"
          style={{margin:'5px', width:'50%', ...buttonSize(matches)}}>
          Bank transfer
        </Button><br/>
        <Button
          name="display"
          variant='contained'
          onClick={redirect(BASEURL+"/cash-thru-atm.php")}
          size="large"
          color="primary"
          style={{margin:'5px', width:'50%', ...buttonSize(matches)}}>
          ATM payment
        </Button>
      </div>
    </div>
  );
};

export default FreePayment;
