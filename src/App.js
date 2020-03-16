// @flow
import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { useImmer } from "use-immer";

import { renderMail } from './ConfirmationMail';
import { NativeContext } from './components/MenuItem';
import Reservation, { defaults } from './Reservation';
import { mobileAndTabletcheck, logSignup, postMail } from './utils';
import { optdefaults } from './EventOptions';
import Payment from './Payment';
import FreePayment from './FreePayment';
import Header from './Header.js';
import Footer from './Footer.js';

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

function App() {
  const [dstate, updateDstate] = useImmer( { open: false } );
  const [event, updateEvent] = useImmer( defaults() );

  const openDialog = (message, redirect) => {
    updateDstate( draft => { return { open: true, message: message, redirect: redirect }; } );
  };

  const closeDialog = () => {
    updateDstate( draft => { return { open: false }; } );
    if ( dstate.redirect ) window.location = dstate.redirect;
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function(details) {
      logSignup( event, optdefaults )
        .then( () => postMail( event, renderMail ) )
        .then( () => {
          updateEvent( draft => defaults() );
          openDialog( "Thank you!" );
        });
    });
  };

  const native=mobileAndTabletcheck();

  const routes = [
    {
      path: ["/freepayment"],
      exact: true,
      title: () => "FreePayment",
      main: () => <FreePayment
                    openDialog={openDialog}
                    onInit={undefined}
                  />
    },
    {
      path: ["/reservations/payment"],
      exact: true,
      title: () => "Payment",
      main: () => <Payment
                    openDialog={openDialog}
                    onApprove={onApprove}
                    onInit={undefined}
                    event={event}
                  />
    },
    {
      path: "/reservations",
      exact: true,
      title: () => '',
      main: () => <Reservation
                    openDialog={openDialog}
                    event={event}
                    updateEvent={updateEvent}
                  />
    },
  ];

  const routecomps = routes.map((route,index) => (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        children={route.main}
      />
  ));

  return (
    <>
      <Header/>
      <div style={{display:'flex', flexFlow:'column', justifyContent: "space-between", width:"100%"}}>
        <NativeContext.Provider value={native}>
          <Router>
            <Switch>
              { routecomps }
            </Switch>
          </Router>
        </NativeContext.Provider>
      </div>
      <Footer/>

      <AlertReservedDialog open={dstate.open} close={closeDialog} message={dstate.message}/>
    </>
  );
};

export default App;
