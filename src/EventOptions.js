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
import PersonalDetails from './PersonalDetails';

const personalinfo_def = () => {return {
  name: '',
  age: '',
  sex: 'Female',
  cellphone: '',
  email: '',
}};

const null_def = () => { return {}; };

// This must contain all the keys in the useEffect function below!!
const optkeys = ['camping', 'dolphin', 'fuji', 'oshima', 'snowmonkey', 'nightstay', 'skisno', 'trekking', 'unryu', 'zao', 'null'];
const resetDraft = (draft, cnt, nm, def) => {
  const kys = optkeys;
  const count = parseInt( cnt );
  kys.forEach( k => { delete draft[k]; delete draft.fees[k] } );
  if ( def ) {
    // Fill array with copies of the return of the default function.
    // See [[https://2ality.com/2013/11/initializing-arrays.html]]
    const copyXTimes = (f, c) => {
      const arr = Array.apply( null, Array( c ) ).map( (x,i) => f(i) );
      return arr;
    };
    const defs = copyXTimes( i=>[{...personalinfo_def(), idx: i},def()], count )
    const fees = copyXTimes( i=>{return{}}, count )
    Object.assign( draft, { [nm]: defs });
    Object.assign( draft.fees, { [nm]: fees });
  }
};

const PersonalizedOption = ({personalinfo, updatePersonalinfo, idx, children, contact, register, errors}) => {
  if ( personalinfo === undefined ) return null;

  return (
    <div style={{display:'flex', flexFlow:'column', padding: '5px', margin:'5px'}}>
      <CondDisplay showif={true}>
        <PersonalDetails
          personalinfo={personalinfo}
          updatePersonalinfo={updatePersonalinfo}
          idx={idx}
          contact={contact}
          register={register}
          errors={errors}
        />
      </CondDisplay>
      {children}
    </div>
  );
};

const EventOptions = ( {eventType, eventinfo, updateEventOptions, updateEventFees, cnt, register, errors} ) => {
  useEffect( () => {
    if ( eventType === "C" )      updateEventOptions( draft => { resetDraft(draft, cnt, 'camping',    campinginfo_def); } );
    else if ( eventType === "D" ) updateEventOptions( draft => { resetDraft(draft, cnt, 'dolphin',    dolphininfo_def); } );
    else if ( eventType === "F" ) updateEventOptions( draft => { resetDraft(draft, cnt, 'fuji',       fuji_def); } );
    else if ( eventType === "G" ) updateEventOptions( draft => { resetDraft(draft, cnt, 'general',    null_def); } );
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
    var [el,ky] = [null,null];
    if ( typ === "C" ) {
      ky = 'camping';
      el = <Camping
             campinginfo={eventinfo.camping && eventinfo.camping[i] && eventinfo.camping[i][1]}
             updateCampinginfo={updateEventInfo('camping', i)}
             updateEventFees={updateEventFeesI('camping', i)}/>;
    } else if ( typ === "D" ) {
      ky = 'dolphin';
      el = <Dolphin
             dolphininfo={eventinfo.dolphin && eventinfo.dolphin[i] && eventinfo.dolphin[i][1]}
             updateDolphininfo={updateEventInfo('dolphin', i)}
             updateEventFees={updateEventFeesI('dolphin', i)}/>;
    } else if ( typ === "F" ) {
      ky = 'fuji';
      el = <Fuji
             fujiinfo={eventinfo.fuji && eventinfo.fuji[i] && eventinfo.fuji[i][1]}
             updateFujiinfo={updateEventInfo('fuji', i)}
             updateEventFees={updateEventFeesI('fuji', i)}/>;
    } else if ( typ === "G" ) {
      ky = 'general';
      el = null;
    } else if ( typ === "I" ) {
      ky = 'oshima';
      el = <Oshima
             oshimainfo={eventinfo.oshima && eventinfo.oshima[i] && eventinfo.oshima[i][1]}
             updateOshimainfo={updateEventInfo('oshima', i)}
             updateEventFees={updateEventFeesI('oshima', i)}/>;
    } else if ( typ === "M" ) {
      ky = 'snowmonkey';
      el = <SnowMonkey
             snowmonkeyinfo={eventinfo.snowmonkey && eventinfo.snowmonkey[i] && eventinfo.snowmonkey[i][1]}
             updateSnowMonkeyinfo={updateEventInfo('snowmonkey', i)}
             updateEventFees={updateEventFeesI('snowmonkey', i)}/>;
    } else if ( typ === "N" ) {
      ky = 'nightstay';
      el = <NightStay
             nightstayinfo={eventinfo.nightstay && eventinfo.nightstay[i] && eventinfo.nightstay[i][1]}
             updateNightStayinfo={updateEventInfo('nightstay', i)}
             updateEventFees={updateEventFeesI('nightstay', i)}/>;
    } else if ( typ === "S" ) {
      ky = 'skisno';
      el = <SkiSnowboarding
             skisnoinfo={eventinfo.skisno && eventinfo.skisno[i] && eventinfo.skisno[i][1]}
             updateSkiSnoinfo={updateEventInfo('skisno', i)}
             updateEventFees={updateEventFeesI('skisno', i)}/>;
    } else if ( typ === "H" ) {
      ky = 'trekking';
      el = <Trekking
             trekkinginfo={eventinfo.trekking && eventinfo.trekking[i] && eventinfo.trekking[i][1]}
             updateTrekkinginfo={updateEventInfo('trekking', i)}
             updateEventFees={updateEventFeesI('trekking', i)}/>;
    } else if ( typ === "U" ) {
      ky = 'unryu';
      el = <Unryu
             unryuinfo={eventinfo.unryu && eventinfo.unryu[i] && eventinfo.unryu[i][1]}
             updateUnryuinfo={updateEventInfo('unryu', i)}
             updateEventFees={updateEventFeesI('unryu', i)}/>;
    } else if ( typ === "Z" ) {
      ky = 'zao';
      el = <Zao
             zaoinfo={eventinfo.zao && eventinfo.zao[i] && eventinfo.zao[i][1]}
             updateZaoinfo={updateEventInfo('zao', i)}
             updateEventFees={updateEventFeesI('zao', i)}/>;
    } else return null;

    return <PersonalizedOption
             personalinfo={eventinfo[ky] && eventinfo[ky][i] && eventinfo[ky][i][0]}
             updatePersonalinfo={updatePersonalInfo(ky, i)}
             contact={eventinfo.contact}
             idx={i}
             key={i}
             register={register}
             errors={errors}>
             {el}
           </PersonalizedOption>;
  };

  var cldrn = [];

  for( var i=0; i< cnt; ++i ) {
    const child = createElement( eventType, i );
    if ( child != null ) cldrn.push( child );
  };

  return cldrn.length ? (
    <>
      <h3>Participant Details</h3>
	  <div className="page-content">
        {cldrn}
      </div>
    </>
  ) : null;
};

export default EventOptions;
