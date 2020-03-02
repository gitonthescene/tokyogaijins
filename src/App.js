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

import { NativeContext } from './components/MenuItem';
import { contactDetails_def } from './ContactDetails';
import { event_def } from './Reservation';

import Header from './Header.js';
import Footer from './Footer.js';

import { mobileAndTabletcheck } from './utils';
import Reservation from './Reservation';

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
  const defaults = () => {return {
    event: event_def(),
    contact: contactDetails_def(),
    fees: {},
    other: {comments:'', consent: false, checked: false}
  };};

  const [event, updateEvent] = useImmer( defaults() );
  const [dstate, updateDstate] = useImmer( { open: false } );

  const openDialog = (message, redirect) => {
    updateDstate( draft => { return { open: true, message: message, redirect: redirect }; } );
  };

  const closeDialog = () => {
    updateDstate( draft => { return { open: false }; } );
    if ( dstate.redirect ) window.location = dstate.redirect;
  };

  const native=mobileAndTabletcheck();

  const routes = [
    {
      path: ["/student/:id", "/student"],
      exact: false,
      title: () => "Student",
      main: () => <></>
    },
    {
      path: "/",
      exact: true,
      title: () => '',
      main: () => <Reservation
                    openDialog={openDialog}
                    event={event}
                    updateEvent={updateEvent}
                    defaults={defaults}/>
    },
  ];

  const routecomps = routes.map((route,index) => (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.main}
      />
  ));

  return (
    <>
      <div style={{width:"80%", marginLeft:"auto", marginRight:"auto"}}>
        <Header/>
      </div>
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
