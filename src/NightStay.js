// @flow
import React from "react";
import type { Node } from "react";

import { roomOptsByEvent } from "./constants";
import Room, { room_def } from "./Room";
import type { EventInfoType } from "./types";

type NightStayInfo = {};

export type NightStayPriceInfo = {};

export const nightstay_def = () => {
  const room = room_def();
  return {
    ...room,
  };
};

const NightStay = ({
  info,
  updateInfo,
  updateEventFees,
  prices,
}: EventInfoType<NightStayInfo, NightStayPriceInfo>): Node => {
  let nightstayinfo = info;
  let updateNightStayinfo = updateInfo;
  if (nightstayinfo === undefined) return null;

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
      <Room
        roominfo={nightstayinfo}
        updateRoominfo={updateNightStayinfo}
        tentOrRoom="Room"
        roomOpts={roomOptsByEvent.N}
        prices={prices}
        updateEventFees={updateEventFees}
      />
    </div>
  );
};

export default NightStay;
