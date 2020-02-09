import React, { useEffect } from 'react';

import TextField from '@material-ui/core/TextField';

import Camping, { campinginfo_def } from './Camping';
import Dolphin, { dolphininfo_def } from './Dolphin';
import SkiSnowboarding, { skisnoinfo_def } from './SkiSnowboarding';
import SnowMonkey, { snowmonkey_def } from './SnowMonkey';
import NightStay, { nightstay_def } from './NightStay';

const resetDraft = (draft, cnt, nm, def) => {
  const kys = Object.keys( draft );
  kys.forEach( k => delete draft[k] );
  if ( def ) {
    // Fill array with copies of the return of the default function.
    // See [[https://2ality.com/2013/11/initializing-arrays.html]]
    const defs = Array.apply( null, Array( cnt ) ).map( (x,i) => [{name:'', idx: i},def()] );
    Object.assign( draft, { [nm]: defs });
  }
};

const Entry = ({label,value, ...props}) => {
  return (
    <TextField
      type="text"
      label={label}
      value={value}
      {...props}
    />
  );
};

const CondDisplay = ({showif, children}) => {
  return showif ? <>{children}</> : null;
};

const PersonalizedOption = ({personalinfo, updatePersonalinfo, idx, children}) => {
  if ( personalinfo === undefined ) return null;
  const onChange = nm => e => {
    const val = e.target.value;
    updatePersonalinfo( draft => { Object.assign( draft, { [nm]: val } ); } );
  };

  return (
    <div style={{display:'flex', flexFlow:'column', width:'40%', borderStyle:'dotted', padding: '5px', margin:'5px'}}>
      <CondDisplay showif={idx>0}>
        <Entry
          label="Name"
          value={personalinfo.name}
          onChange={onChange('name')}
        />
      </CondDisplay>
      {children}
    </div>
  );
};

const EventOptions = ( {eventType, eventinfo, updateEventOptions, cnt} ) => {
  useEffect( () => {
    if ( eventType === "C" )      updateEventOptions( draft => { resetDraft(draft, cnt, 'camping',    campinginfo_def); } );
    else if ( eventType === "D" ) updateEventOptions( draft => { resetDraft(draft, cnt, 'dolphin',    dolphininfo_def); } );
    else if ( eventType === "S" ) updateEventOptions( draft => { resetDraft(draft, cnt, 'skisno',     skisnoinfo_def); } );
    else if ( eventType === "M" ) updateEventOptions( draft => { resetDraft(draft, cnt, 'snowmonkey', snowmonkey_def); } );
    else if ( eventType === "N" ) updateEventOptions( draft => { resetDraft(draft, cnt, 'nightstay',  nightstay_def); } );
    // .. else just wipe out the opts keys
    else updateEventOptions( draft => { resetDraft( draft ); } );    
  }, [ eventType, updateEventOptions, cnt ] );

  if ( eventinfo.opts === {} ) return null;

  const updateEventInfo = (typ,i) => cb => {
    updateEventOptions( draft => { cb(draft[typ][i][1]); } );
  };

  const updatePersonalInfo = (typ,i) => cb => {
    updateEventOptions( draft => { cb(draft[typ][i][0]); } );
  };
  
  const createElement = (typ,i) => {
    var [component, info, updinfo, ky] = [undefined, undefined, undefined, undefined];
    if ( typ === "C" )
      [component, info, updinfo, ky] = [Camping,         'campinginfo',    'updateCampinginfo',    'camping'];
    else if ( typ === "D" )
      [component, info, updinfo, ky] = [Dolphin,         'dolphininfo',    'updateDolphininfo',    'dolphin'];
    else if ( typ === "S" )
      [component, info, updinfo, ky] = [SkiSnowboarding, 'skisnoinfo',     'updateSkiSnoinfo',     'skisno'];
    else if ( typ === "M" )
      [component, info, updinfo, ky] = [SnowMonkey,      'snowmonkeyinfo', 'updateSnowMonkeyinfo', 'snowmonkey'];
    else if ( typ === "N" )
      [component, info, updinfo, ky] = [NightStay,       'nightstayinfo',  'updateNightStayinfo',  'nightstay'];
    else if ( component === undefined ) return null;

    return React.createElement( PersonalizedOption, {
      personalinfo       : eventinfo.opts[ky] && eventinfo.opts[ky][i] && eventinfo.opts[ky][i][0],
      updatePersonalinfo : updatePersonalInfo(ky, i),
      idx: i,
      key: i
    }, React.createElement( component, {
      [info]    : eventinfo.opts[ky] && eventinfo.opts[ky][i] && eventinfo.opts[ky][i][1],
      [updinfo] : updateEventInfo(ky, i)
    } ) );


  };

  const cldrn = [];
  for( var i=0; i< cnt; ++i ) cldrn.push( createElement( eventType, i ) );
  return React.createElement( 'div', undefined, cldrn );
};

export default EventOptions;
