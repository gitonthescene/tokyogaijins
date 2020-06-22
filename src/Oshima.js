// @flow
import React from "react";
import type { Node } from "react";

import Room, { room_def } from "./Room";
import Choice from "./components/Choice";

import { YesNo, roomOptsByEvent } from "./constants";
import { createOnChange } from "./utils";
import type { EventInfoType } from "./types";

type OshimaInfo = {
  trekking: string,
  bike: string,
  helmet: string,
};

type OshimaPriceInfo = {
  trekking: any,
  bike: any,
  helmet: any,
};

export const oshima_def = () => {
  const room = room_def();
  return {
    trekking: "",
    bike: "",
    helmet: "",
    ...room,
  };
};

const Oshima = ({
  info,
  updateInfo,
  updateEventFees,
  prices,
}: EventInfoType<OshimaInfo, OshimaPriceInfo>): Node => {
  let oshimainfo = info;
  let updateOshimainfo = updateInfo;
  if (oshimainfo === undefined) return null;

  const onChange = createOnChange(
    oshimainfo,
    updateOshimainfo,
    updateEventFees,
    prices
  );

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        borderStyle: "solid",
        padding: "5px",
        margin: "5px",
      }}
    >
      <Choice
        nm="trekking"
        items={YesNo}
        value={oshimainfo.trekking}
        label="Mt. Mihara trekking"
        onChange={onChange("trekking")}
        price={prices.trekking}
      />
      <Choice
        nm="bike"
        items={YesNo}
        value={oshimainfo.bike}
        label="Mountain bike rental"
        onChange={onChange("bike")}
        price={prices.bike}
      />
      <Choice
        nm="helmet"
        items={YesNo}
        value={oshimainfo.helmet}
        label="Helmet rental"
        onChange={onChange("helmet")}
        price={prices.helmet}
      />
      <Room
        roominfo={oshimainfo}
        updateRoominfo={updateOshimainfo}
        tentOrRoom="Room"
        roomOpts={roomOptsByEvent.I}
        prices={prices}
        updateEventFees={updateEventFees}
      />
    </div>
  );
};

export default Oshima;
