
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

