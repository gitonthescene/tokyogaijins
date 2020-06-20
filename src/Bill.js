import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { prettyMoney } from "./utils";

const useStyles = makeStyles({
  btable: {
    width: "100%",
  },
  bheader: {
    background: "#BBB",
    width: "150px",
  },
  bcell: {
    textAlign: "center",
    width: "150px",
  },
  bamt: {
    textAlign: "right",
    width: "250px",
  },
});

const Line = ({ tag, amt }) => {
  const classes = useStyles();
  return (
    <tr>
      <td className={classes.bcell}>{tag}</td>
      <td className={classes.bamt}>{amt}</td>
    </tr>
  );
};

export const calcCost = (state) => {
  var { price } = state.event;
  price = parseInt(price);
  const { count } = state.contact;
  const { fees } = state;
  const { discountOptions, discount } = state.other;
  const discountAmt =
    discountOptions && discount ? discountOptions[discount] : undefined;
  const discountPrice = price - (discountAmt ? discountAmt.price : 0);
  const discountItems = discountAmt
    ? [
        <Line
          tag={`discount (${discount})`}
          amt={prettyMoney(-discountAmt.price)}
          key="discountAmt"
        />,
        <Line tag="" amt={discountPrice} key="prettyMoney(discountPrice)" />,
      ]
    : [];

  var eventItms = [
    <Line tag="event price" amt={prettyMoney(price || 0)} key="baseprice" />,
  ]
    .concat(discountItems)
    .concat(<Line tag="" amt={`x ${count}`} key="multiplier" />);
  var eventTtl = count * discountPrice;

  // For birthday and beginner, the discount is taken after multiplying out
  if (discountAmt && (discount === "birthday" || discount === "beginner")) {
    eventTtl = count * price;
    eventItms = [
      <Line tag="event price" amt={prettyMoney(price)} key="baseprice" />,
      <Line tag="" amt={`x ${count}`} key="multiplier" />,
      <Line tag="" amt={prettyMoney(eventTtl)} key="subtotal" />,
      <Line
        tag={`discount (${discount})`}
        amt={prettyMoney(-discountAmt.price)}
        key="discountAmt"
      />,
    ];
    eventTtl -= discountAmt.price;
  }

  const eventprice = {
    total: eventTtl,
    items: eventItms,
  };

  const feebreakdown = Object.entries(fees).map(([nm, feeitems]) =>
    feeitems.map((indivFees, i) =>
      Object.entries(indivFees).map(([feenm, fee]) => [
        fee,
        <Line
          tag={`${feenm} (${state[nm][parseInt(i)][0].name})`}
          amt={prettyMoney(fee)}
          key={`${feenm}${i}`}
        />,
      ])
    )
  );

  const feeitems =
    feebreakdown.length !== 0
      ? {
          total: feebreakdown[0]
            .flat()
            .map(([fee]) => fee)
            .reduce((ttl, v) => ttl + v, 0),
          items: feebreakdown[0].flat().map(([_, lineitem]) => lineitem),
        }
      : { total: 0 };
  return {
    eventprice: eventprice,
    feeitems: feeitems,
    total: eventprice.total + feeitems.total,
  };
};

const Bill = ({ state }) => {
  const classes = useStyles();
  const { eventprice, feeitems, total } = calcCost(state);

  return (
    <>
      Event:
      <table className={classes.btable}>
        <tbody>
          {eventprice.items}
          <Line tag="sub total" amt={prettyMoney(eventprice.total)} />
        </tbody>
      </table>
      <hr />
      Extras:
      <table className={classes.btable}>
        <tbody>
          {feeitems.items}
          <Line tag="sub total" amt={prettyMoney(feeitems.total)} />
        </tbody>
      </table>
      <hr />
      <table className={classes.btable}>
        <tbody>
          <Line tag="" amt={prettyMoney(eventprice.total)} />
          <Line tag="" amt={prettyMoney(feeitems.total)} />
          <Line tag="Total" amt={prettyMoney(total)} />
        </tbody>
      </table>
    </>
  );
};

export default Bill;
