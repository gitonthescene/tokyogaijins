import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  btable: {
    marginBbottom:'16px',
    width: '100%',
  },
  bheader: {
    background: '#BBB',
    width:'150px'
  },
  bcell: {
    textAlign:'center',
    width:'150px'
  },
  bamt: {
    textAlign:'right',
    width:'250px'
  },
});


const Line = ({tag,amt}) => {
  const classes = useStyles();
  return <tr><td className={classes.bcell}>{tag}</td><td className={classes.bamt}>{amt}</td></tr>;
};

export const calcCost = state => {
  const {price} = state.event;
  const {count} = state.contact;
  const {fees} = state;
  const {discountOptions, discount} = state.other;
  const discountAmt = ( discountOptions && discount ) ? discountOptions[discount] : undefined;
  const discountPrice = price - ( discountAmt ? discountAmt.price : 0 );
  const discountItems = discountAmt ? [ <Line tag={`discount (${discount})`} amt={-discountAmt.price} key="discountAmt"/>,
                                        <Line tag="" amt={discountPrice} key="discountPrice"/> ] : [];

  var eventItms = [ <Line tag="event price" amt={price} key="baseprice"/> ].concat(
    discountItems
  ).concat(
      <Line tag="" amt={`x ${count}`} key="multiplier"/>
  );
  var eventTtl = count*discountPrice;

  // For birthday, the discount is taken after multiplying out
  if ( discountAmt && discount === "birthday" ) {
    eventTtl = count*price;
    eventItms = [
      <Line tag="event price" amt={price} key="baseprice"/>,
      <Line tag="" amt={`x ${count}`} key="multiplier"/>,
      <Line tag="" amt={eventTtl} key="subtotal"/>,
      <Line tag={`discount (${discount})`} amt={-discountAmt.price} key="discountAmt"/>
    ];
    eventTtl -= discountAmt.price;
  };
  
  const eventprice = {
    total: eventTtl,
    items: eventItms
  };

  const feebreakdown = Object.entries( fees ).map( ([nm,feeitems]) => feeitems.map((indivFees,i) => Object.entries(indivFees).map( ([feenm,fee]) => [fee,<Line tag={`${feenm} (${state[nm][parseInt(i)][0].name})`} amt={fee} key={i}/>] )));

  const feeitems = feebreakdown.length !==0 ? {
    total: feebreakdown[0].flat().map(([fee]) => fee ).reduce( (ttl,v) => ttl + v, 0),
    items: feebreakdown[0].flat().map( ([_,lineitem]) => lineitem )
  } : {total:0};
  return { eventprice: eventprice, feeitems: feeitems, total: eventprice.total + feeitems.total };
};

const Bill = ({state}) => {
  const classes = useStyles();
  const {eventprice, feeitems, total} = calcCost( state );

  return (
    <>
      <table className={classes.btable}>
        <tbody>
          { eventprice.items }
          <Line tag="sub total" amt={eventprice.total}/>
        </tbody>
      </table>
      <hr/>
      <table className={classes.btable}>
        <tbody>
          { feeitems.items }
          <Line tag="sub total" amt={feeitems.total}/>
        </tbody>
      </table>
      <hr/>
      <table className={classes.btable}>
        <tbody>
          <Line tag="" amt={eventprice.total}/>
          <Line tag="" amt={feeitems.total}/>
          <Line tag="Total" amt={total}/>
        </tbody>
      </table>
    </>
  );
};

export default Bill;
