import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';
import { clientId as CLIENTID } from './config.json';

const PayPal = ({isScriptLoaded, isScriptLoadSucceed, setPayPalActions, ...props}) => {
  const [ showButton, setShowButton ] = useState( false );

  useEffect( () => {
    if ( isScriptLoaded && isScriptLoadSucceed ) {
      setShowButton( true );
    };
  }, [ isScriptLoaded, isScriptLoadSucceed, setShowButton ] );

  const onInit = ( data, actions ) => {
    // Capture actions for manipulation outside of this component
    actions.disable();
    if ( setPayPalActions ) setPayPalActions( actions );
  };
  
  if ( showButton ) {
    const PayPalButton = window.paypal.Buttons.driver( 'react', { React, ReactDOM } );

    return (
      <PayPalButton
        onInit={onInit}
        {...props}
      />
    );
  };

  return null;
};

export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENTID}&currency=JPY`)(PayPal);
