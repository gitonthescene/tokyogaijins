import React, { useEffect } from 'react';
import Camping, { campinginfo_def } from './Camping';
import Dolphin, { dolphininfo_def } from './Dolphin';
import SkiSnowboarding, { skisnoinfo_def } from './SkiSnowboarding';

//  else if ( eventType == "F" ) return <Fuji eventinfo={eventinfo}/>;
//  else if ( eventType == "G" ) return <General eventinfo={eventinfo}/>;
//  else if ( eventType == "H" ) return <Hiking eventinfo={eventinfo}/>;
//  else if ( eventType == "I" ) return <Oshima eventinfo={eventinfo}/>;
//  else if ( eventType == "M" ) return <SnowMonkey eventinfo={eventinfo}/>;
//  else if ( eventType == "N" ) return <Dunno eventinfo={eventinfo}/>;
//  else if ( eventType == "P" ) return <Party eventinfo={eventinfo}/>;
//  else if ( eventType == "S" ) return <SkiSnoboarding eventinfo={eventinfo}/>;
//  else if ( eventType == "U" ) return <Unryu eventinfo={eventinfo}/>;
//  else if ( eventType == "Z" ) return <Zao eventinfo={eventinfo}/>;

const EventOptions = ( {eventType, eventinfo, updateEventOptions} ) => {
  useEffect( () => {
    if ( eventType === "C" ) updateEventOptions( draft => { Object.assign( draft, { camping: campinginfo_def() });} );
    else if ( eventType === "D" ) updateEventOptions( draft => { Object.assign( draft, { dolphin: dolphininfo_def() } );} );
    else if ( eventType === "S" ) updateEventOptions( draft => { Object.assign( draft, { skisno: skisnoinfo_def() } ); } );
    // .. else wipe out the opts keys
    else updateEventOptions( draft => { const kys = Object.keys( draft ); kys.forEach( k => delete draft[k] ); } );
    
  }, [ eventType, updateEventOptions ] );
  if ( eventinfo.opts === {} ) return null;

  const updateEventInfo = typ => cb => {
    updateEventOptions( draft => { cb(draft[typ]); } );
  };

  if ( eventType === "C" ) return <Camping
                                    campinginfo={eventinfo.opts.camping}
                                    updateCampinginfo={updateEventInfo('camping')}/>;

  else if ( eventType === "D" ) return <Dolphin
                                         dolphininfo={eventinfo.opts.dolphin}
                                         updateDolphininfo={updateEventInfo('dolphin')}/>;

  else if ( eventType === "S" ) return <SkiSnowboarding
                                         skisnoinfo={eventinfo.opts.skisno}
                                         updateSkiSnoinfo={updateEventInfo('skisno')}/>;

  return null;
};

export default EventOptions;
