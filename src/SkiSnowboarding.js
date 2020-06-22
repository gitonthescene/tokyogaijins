// @flow
import React from "react";
import type { Node } from "react";
import RentalLessonInfo, { rentallessoninfo_def } from "./RentalLessonInfo";
import Room, { room_def } from "./Room";

import { roomOptsByEvent } from "./constants";
import type { EventInfoType } from "./types";

type SkiSnowboardingInfo = {};
export type SkiSnowboardingPriceInfo = {};

export const skisnoinfo_def = () => {
  const room = room_def();
  const rental = rentallessoninfo_def();
  return {
    ...rental,
    ...room,
  };
};

const SkiSnowboarding = ({ info, updateInfo, updateEventFees, prices }) => {
  let skisnoinfo = info;
  let updateSkiSnoinfo = updateInfo;
  if (skisnoinfo === undefined) return null;

  return (
    <>
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
          rentallessoninfo={skisnoinfo}
          updateRentallessoninfo={updateSkiSnoinfo}
          prices={prices}
          updateEventFees={updateEventFees}
        />
      </div>
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
          roominfo={skisnoinfo}
          updateRoominfo={updateSkiSnoinfo}
          tentOrRoom="Room"
          roomOpts={roomOptsByEvent.Z}
          prices={prices}
          updateEventFees={updateEventFees}
        />
      </div>
    </>
  );
};

export default SkiSnowboarding;
