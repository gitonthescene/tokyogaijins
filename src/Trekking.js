// @flow
import React from "react";
import type { Node } from "react";

import Room, { room_def } from "./Room";
import Choice from "./components/Choice";

import { roomOptsByEvent, YesNo } from "./constants";
import { createOnChange } from "./utils";
import type { EventInfoType } from "./types";

type TrekkingInfo = {
  Happoike: string,
  Tsugaike: string,
  Tateyama: string,
};

type TrekkingPriceInfo = {};

export const trekking_def = () => {
  const room = room_def();
  return {
    Happoike: "No",
    Tsugaike: "No",
    Tateyama: "No",
    ...room,
  };
};

const Trekking = ({
  info,
  updateInfo,
  updateEventFees,
  prices,
}: EventInfoType<TrekkingInfo, TrekkingPriceInfo>): Node => {
  let trekkinginfo = info;
  let updateTrekkinginfo = updateInfo;
  if (trekkinginfo === undefined) return null;

  const onChange = createOnChange(trekkinginfo, updateTrekkinginfo);

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
        nm="room"
        items={YesNo}
        value={trekkinginfo.Happoike}
        label="Happoike"
        onChange={onChange("Happoike")}
      />
      <Choice
        nm="room"
        items={YesNo}
        value={trekkinginfo.Tsugaike}
        label="Tsugaike"
        onChange={onChange("Tsugaike")}
      />
      <Choice
        nm="room"
        items={YesNo}
        value={trekkinginfo.Tateyama}
        label="Tateyama"
        onChange={onChange("Tateyama")}
      />
      <Room
        roominfo={trekkinginfo}
        updateRoominfo={updateTrekkinginfo}
        tentOrRoom="Room"
        roomOpts={roomOptsByEvent.H}
        prices={prices}
        updateEventFees={updateEventFees}
      />
    </div>
  );
};

export default Trekking;
