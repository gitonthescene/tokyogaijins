import {debug as DEBUG} from './config.json';
import marked from 'marked';

export const createOnChange = ( state, update, updatefees=undefined, prices={}, combo={}, getsideeffect=undefined ) => {
  const { restoreComboElementsAll, clearComboAll } = combo;
  return nm => e => {
    const val = e.target.value;
    const sideEffect = getsideeffect ? getsideeffect( nm, e.target.value, state ) : {};
    update( draft => { Object.assign( draft, { [nm]: val }, sideEffect ); } );

    const sideEffectPrcUpd = Object.fromEntries( Object.keys( sideEffect ).map( k => {
      return [ k, prices[k] && prices[k][sideEffect[k]] ];
    } ) );

    // if going from combo to non-combo, restore prices of everything
    var comboPrcUpd = restoreComboElementsAll && restoreComboElementsAll( state, sideEffect );

    // defaults up front.  overrides in the back.
    const priceUpdate = { ...comboPrcUpd, [nm]: prices[nm] && prices[nm][val], ...sideEffectPrcUpd };

    updatefees && updatefees( draft => {
      Object.assign( draft, priceUpdate );
      Object.keys( draft ).forEach( k => { if ( draft[k] === undefined ) delete draft[k] } );
      clearComboAll && clearComboAll( draft );
    } );
  };
};

export const calcComboSideEffect = (full, elements) => {
  return (nm, val, state) => {
    if ( nm === full ) {
      if ( val === 'Yes' ) {
        return Object.fromEntries( elements.map( k => [ k, 'Yes' ] ) );
      } else {
        return Object.fromEntries( elements.map( k => [ k, 'No' ] ) );
      }
    };

    var comboElement = false;
    elements.forEach( k => {
      comboElement = comboElement || (k === nm);
    } );
    if ( !comboElement ) return {};

    var allChosen = true;
    elements.forEach( k => {
      const chk = (k === nm) ? val : state[k];
      allChosen = allChosen && (chk === 'Yes');
    } );

    if ( allChosen === true )
      return { [full]: 'Yes' };
    else
      return { [full]: 'No' };  
  };
};

export const clearCombo = (full, elements) => {
  return draft => {
    if ( draft[ full ] ) {
      elements.forEach( k => delete draft[k] );
    };
  };
};

// if going from combo to non-combo, restore prices of everything
export const restoreComboElements = (full, elements, prices) => {
  return (state, sideEffect) => {
    if ( state[full] === 'Yes' && sideEffect[full] && 'No' )
      return Object.fromEntries(elements.map( k => [k, prices[k] && prices[k].Yes] ));
    return {};
  };
};

export const mobileAndTabletcheck = () => {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

export const formatMail = state => {
  //var out = JSON.stringify(state, undefined, 2) + "\n\n";
  var out = "# Event\n";
  out += `***${state.event.name}***\n`;
  if ( DEBUG ) console.log( state );
  var headers = Object.keys(state.contact);
  out += "\n## Contact info\n";
  out += headers.join(" | ") + "\n";
  out += headers.map( k => "-".repeat(k.length) ).join(" | ") + "\n";
  var row = Object.values( state.contact );
  // Convert to strings first and then check the length for empty strings
  out += row.map( k => k+'' ).map( k => k.length > 0 ? k : "-" ).join(" | ") + "\n";
  out += "\n";
  if ( Object.entries(state.fees).length === 0 ) {
    if ( DEBUG ) console.log( out );
    return marked(out);
  }
  // There should only be one key under state.fees and it should be
  // the key of the set of options in state
  const eventType = Object.keys(state.fees)[0];
  const optionlst = state[eventType];
  const opts = Object.keys(optionlst[0][1]);
  headers = ['nickname', ...opts];
  out += "\n## Extras\n";
  out += headers.join(" | ") + "\n";
  out += headers.map( k => "-".repeat(k.length) ).join(" | ") + "\n";
  optionlst.forEach( person => {
    const row = Object.values( person[1] );
    // Convert to strings first and then check the length for empty strings
    out += [person[0].name, ...row].map( k => k+'' ).map( k => k.length > 0 ? k : "-" ).join(" | ") + "\n";
  });
  out += "\n";
  if ( DEBUG ) console.log( out );
  return marked(out);
};
