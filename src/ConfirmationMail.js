// @flow
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { makeStyles, ServerStyleSheets } from '@material-ui/core/styles';

import Bill from './Bill';

const useStyles = makeStyles({
  ctable: {
    marginBottom:'16px',
    width: '100%',
  },
  cheader: {
    background: '#BBB',
    width:'150px'
  },
  ccell: {
    width:'250px'
  },
});

const skipKeys = {
  idx: 1,
};

const ConfirmationMail = ({state}) => {
  const classes = useStyles();

  const Row = ({name,val}) => (
    <tr key={name}>
      <th className={classes.cheader}>{name}</th>
      <td className={classes.ccell}>{val}</td>
    </tr>
  );

  const Person = ({person}) => {
    return (
      <>
        <table className={classes.ctable}>
          <tbody>
            { Object.entries( person[0] ).filter(([k]) => !skipKeys[k] ).map( ([k,v]) => <Row name={k} val={v} key={k}/>) }
          </tbody>
        </table>
        <table className={classes.ctable}>
          <tbody>
            { Object.entries( person[1] ).map( ([k,v]) => <Row name={k} val={v} key={k}/>) }
          </tbody>
        </table>
      </>
    );
  };
  const eventType = Object.keys(state.fees)[0];
  const optionlst = state[eventType] || [];
  const optionRows = optionlst.map( person => <Person person={person} key={person[0].name}/> );

  return (
    <div style={{display:'flex', flexFlow:'column', alignItems:'center'}}>
      <table className={classes.ctable}>
        <tbody>
          <Row name="Event" val={state.event.name}/>
        </tbody>
      </table>
      <table className={classes.ctable}>
        <tbody>
          <Row name="Full name" val={state.contact.fullname}/>
          <Row name="Sex" val={state.contact.sex}/>
          <Row name="Cell phone" val={state.contact.cellphone}/>
          <Row name="Email" val={state.contact.email}/>
        </tbody>
      </table>
      {optionRows}
      <table className={classes.ctable}>
        <tbody>
          <Row name="Comments" val={state.other.comments}/>
        </tbody>
      </table>
      <div style={{width:'50%', margin:'50px'}}>
        <Bill state={state}/>
      </div>
    </div>
  );
};

export const renderMail = (state) => {
  const sheets = new ServerStyleSheets();
  const markup = renderToStaticMarkup( sheets.collect( <ConfirmationMail state={state}/> ) );
  const css = sheets.toString();
  return `<style>${css}</style>${markup}`;
};

export default ConfirmationMail;
