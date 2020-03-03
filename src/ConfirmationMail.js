// @flow
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const skipKeys = {
  idx: 1,
};

const ConfirmationMail = ({state}) => {

  const Row = ({name,val}) => <tr key={name}><th>{name}</th><td>{val}</td></tr>;
  const Person = ({person}) => {
    return (
      <>
        <table className="confirm">
          <tbody>
            { Object.entries( person[0] ).filter(([k]) => !skipKeys[k] ).map( ([k,v]) => <Row name={k} val={v} key={k}/>) }
          </tbody>
        </table>
        <table className="confirm">
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
    <>
      <table className="confirm">
        <tbody>
          <Row name="Event" val={state.event.name}/>
        </tbody>
      </table>
      <table className="confirm">
        <tbody>
          <Row name="Full name" val={state.contact.fullname}/>
          <Row name="Sex" val={state.contact.sex}/>
          <Row name="Cell phone" val={state.contact.cellphone}/>
          <Row name="Email" val={state.contact.email}/>
        </tbody>
        {optionRows}
      </table>
    </>
  );
};

export const renderMail = (state) => {
  const style = `
    <style>
      .confirm th { background:#EEE;width:150px; }
      .confirm td { width:250px; }
      .confirm { margin-bottom:16px; }
    </style>
`;
  return style+renderToStaticMarkup( <ConfirmationMail state={state}/> );
};

export default ConfirmationMail;
