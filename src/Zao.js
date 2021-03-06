// @flow
import React from "react";
import type { Node } from "react";

import RentalLessonInfo, { rentallessoninfo_def } from "./RentalLessonInfo";
import Room, { room_def } from "./Room";
import Choice from "./components/Choice";

import { YesNo, roomOptsByEvent } from "./constants";
import { createOnChange } from "./utils";
import type { EventInfoType } from "./types";

export type ZaoInfo = {
  snowmonster: string,
  foxvillage: string,
};

export type ZaoPriceInfo = {
  lessons: any,
};

export const zao_def = (): ZaoInfo => {
  const room = room_def();
  const rental = rentallessoninfo_def();
  return {
    snowmonster: "No",
    foxvillage: "No",
    ...rental,
    ...room,
  };
};

// item: { value: price }
// item must match the nm of the field
// value must match the value in constants
export const prices = {
  lessons: {
    "Beginners snowboarding": 0,
    "Beginners skiing": 0,
    "Intermediate snowboarding (90mins)": 9000,
  },
};

const Zao = ({
  info,
  updateInfo,
  updateEventFees,
}: EventInfoType<ZaoInfo, ZaoPriceInfo>): Node => {
  let zaoinfo = info;
  let updateZaoinfo = updateInfo;
  if (zaoinfo === undefined) return null;
  const onChange = createOnChange(
    zaoinfo,
    updateZaoinfo,
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
      <RentalLessonInfo
        eventType="S"
        rentallessoninfo={zaoinfo}
        updateRentallessoninfo={updateZaoinfo}
        prices={prices}
        updateEventFees={updateEventFees}
      />
      <Choice
        nm="snowmonster"
        items={YesNo}
        value={zaoinfo.snowmonster}
        label="Snow Monster Light up"
        onChange={onChange("snowmonster")}
      />
      <Choice
        nm="foxvillage"
        items={YesNo}
        value={zaoinfo.foxvillage}
        label="Fox Village Trip"
        onChange={onChange("foxvillage")}
      />
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
          roominfo={zaoinfo}
          updateRoominfo={updateZaoinfo}
          tentOrRoom="Room"
          roomOpts={roomOptsByEvent.Z}
          prices={prices}
          updateEventFees={updateEventFees}
        />
      </div>
    </div>
  );
};

export default Zao;
