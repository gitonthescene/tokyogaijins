import React, { useEffect } from 'react';

import Camping, { campinginfo_def } from './Camping';
import Dolphin, { dolphininfo_def } from './Dolphin';
import SkiSnowboarding, { skisnoinfo_def } from './SkiSnowboarding';
import SnowMonkey, { snowmonkey_def } from './SnowMonkey';
import NightStay, { nightstay_def } from './NightStay';
import Zao, { zao_def } from './Zao';
import Unryu, { unryu_def } from './Unryu';
import Trekking, { trekking_def } from './Trekking';
import Oshima, { oshima_def } from './Oshima';
import Fuji, { fuji_def } from './Fuji';
import CondDisplay from './components/CondDisplay';
import Entry from './components/Entry';

// This must contain all the keys in the useEffect function below!!
const optkeys = ['camping', 'dolphin', 'fuji', 'oshima', 'snowmonkey', 'nightstay', 'skisno', 'trekking', 'unryu', 'zao'];
const resetDraft = (draft, cnt, nm, def) => {
  const kys = optkeys;
  kys.forEach( k => { delete draft[k]; delete draft.fees[k] } );
  if ( def ) {
    // Fill array with copies of the return of the default function.
    // See [[https://2ality.com/2013/11/initializing-arrays.html]]
    const defs = Array.apply( null, Array( cnt ) ).map( (x,i) => [{name:'', idx: i},def()] );
    const fees = Array.apply( null, Array( cnt ) ).map( (x,i) => {return {};} );
    Object.assign( draft, { [nm]: defs });
    Object.assign( draft.fees, { [nm]: fees });
  }
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

const EventOptions = ( {eventType, eventinfo, updateEventOptions, updateEventFees, cnt} ) => {
  useEffect( () => {
    if ( eventType === "C" )      updateEventOptions( draft => { resetDraft(draft, cnt, 'camping',    campinginfo_def); } );
    else if ( eventType === "D" ) updateEventOptions( draft => { resetDraft(draft, cnt, 'dolphin',    dolphininfo_def); } );
    else if ( eventType === "F" ) updateEventOptions( draft => { resetDraft(draft, cnt, 'fuji',       fuji_def); } );
    else if ( eventType === "I" ) updateEventOptions( draft => { resetDraft(draft, cnt, 'oshima',     oshima_def); } );
    else if ( eventType === "M" ) updateEventOptions( draft => { resetDraft(draft, cnt, 'snowmonkey', snowmonkey_def); } );
    else if ( eventType === "N" ) updateEventOptions( draft => { resetDraft(draft, cnt, 'nightstay',  nightstay_def); } );
    else if ( eventType === "S" ) updateEventOptions( draft => { resetDraft(draft, cnt, 'skisno',     skisnoinfo_def); } );
    else if ( eventType === "H" ) updateEventOptions( draft => { resetDraft(draft, cnt, 'trekking',   trekking_def); } );
    else if ( eventType === "U" ) updateEventOptions( draft => { resetDraft(draft, cnt, 'unryu',      unryu_def); } );
    else if ( eventType === "Z" ) updateEventOptions( draft => { resetDraft(draft, cnt, 'zao',        zao_def); } );
    // .. else just wipe out the optkeys
    else updateEventOptions( draft => { resetDraft( draft ); } );    
  }, [ eventType, updateEventOptions, cnt ] );

  const updateEventFeesI = (typ,i) => cb => {
    updateEventFees( draft => { cb(draft[typ][i]); } );
  };

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
    else if ( typ === "F" )
      [component, info, updinfo, ky] = [Fuji,            'fujiinfo',       'updateFujiinfo',        'fuji'];
    else if ( typ === "I" )
      [component, info, updinfo, ky] = [Oshima,          'oshimainfo',     'updateOshimainfo',     'oshima'];
    else if ( typ === "M" )
      [component, info, updinfo, ky] = [SnowMonkey,      'snowmonkeyinfo', 'updateSnowMonkeyinfo', 'snowmonkey'];
    else if ( typ === "N" )
      [component, info, updinfo, ky] = [NightStay,       'nightstayinfo',  'updateNightStayinfo',  'nightstay'];
    else if ( typ === "S" )
      [component, info, updinfo, ky] = [SkiSnowboarding, 'skisnoinfo',     'updateSkiSnoinfo',     'skisno'];
    else if ( typ === "H" )
      [component, info, updinfo, ky] = [Trekking,        'trekkinginfo',   'updateTrekkinginfo',   'trekking'];
    else if ( typ === "U" )
      [component, info, updinfo, ky] = [Unryu,           'unryuinfo',      'updateUnryuinfo',      'unryu'];
    else if ( typ === "Z" )
      [component, info, updinfo, ky] = [Zao,             'zaoinfo',        'updateZaoinfo',        'zao'];
    else if ( component === undefined ) return null;

    return React.createElement( PersonalizedOption, {
      personalinfo       : eventinfo[ky] && eventinfo[ky][i] && eventinfo[ky][i][0],
      updatePersonalinfo : updatePersonalInfo(ky, i),
      idx: i,
      key: i
    }, React.createElement( component, {
      [info]    : eventinfo[ky] && eventinfo[ky][i] && eventinfo[ky][i][1],
      [updinfo] : updateEventInfo(ky, i),
      updateEventFees : updateEventFeesI(ky, i)
    } ) );
  };

  const cldrn = [];
  for( var i=0; i< cnt; ++i ) {
    const child = createElement( eventType, i );
    if ( child != null ) cldrn.push( child );
  };

  return ( <div>
             {cldrn}
           </div> );
};

export default EventOptions;
