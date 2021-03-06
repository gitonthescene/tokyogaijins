// @flow
import React from "react";
import type { Node } from "react";

import CondDisplay from "./components/CondDisplay";
import Entry from "./components/Entry";
import Choice from "./components/Choice";
import type { EventInfoType } from "./types";
import {
  NOTNEEDED,
  YesNo,
  bootsizeOpts,
  jacketpantsizeOpts,
  glovesizeOpts,
  neededOpts,
} from "./constants";
import { createOnChange } from "./utils";

export type UnryuInfo = {
  height: string,
  bootsize: string,
  hikingboots: string,
  jacketpantsize: string,
  glovesize: string,
  goggles: string,
};

export type UnryuPriceInfo = {
  hikingboots: any,
  jacketpantsize: any,
  glovesize: any,
  goggles: any,
};

export const unryu_def = (): UnryuInfo => {
  return {
    height: "",
    bootsize: "",
    hikingboots: "No",
    jacketpantsize: NOTNEEDED,
    glovesize: NOTNEEDED,
    goggles: NOTNEEDED,
  };
};

const Unryu = ({
  info,
  updateInfo,
  updateEventFees,
  prices,
}: EventInfoType<UnryuInfo, UnryuPriceInfo>): Node => {
  let unryuinfo = info;
  let updateUnryuinfo = updateInfo;
  if (unryuinfo === undefined) return null;

  const onChange = createOnChange(
    unryuinfo,
    updateUnryuinfo,
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
        nm="hikingboots"
        items={YesNo}
        value={unryuinfo.hikingboots}
        label="Waterproof (gortex) hiking boots"
        onChange={onChange("hikingboots")}
        price={prices.hikingboots}
      />
      <CondDisplay showif={unryuinfo.hikingboots !== "No"}>
        <div
          style={{ display: "flex", flexFlow: "column", marginLeft: "10px" }}
        >
          <Entry
            label="Your Height (in cm)"
            value={unryuinfo.height}
            onChange={onChange("height")}
          />
          <Choice
            nm="bootsize"
            items={bootsizeOpts}
            value={unryuinfo.bootsize}
            label="Boot size (in Japanese)"
            onChange={onChange("bootsize")}
          />
        </div>
      </CondDisplay>
      <Choice
        nm="jacketpantsize"
        items={jacketpantsizeOpts}
        value={unryuinfo.jacketpantsize}
        label="Jacket and pants"
        onChange={onChange("jacketpantsize")}
        price={prices.jacketpantsize}
      />
      <Choice
        nm="glovesize"
        items={glovesizeOpts}
        value={unryuinfo.glovesize}
        label="Gloves"
        onChange={onChange("glovesize")}
        price={prices.glovesize}
      />
      <Choice
        nm="goggles"
        items={neededOpts}
        value={unryuinfo.goggles}
        label="Goggles"
        onChange={onChange("goggles")}
        price={prices.goggles}
      />
    </div>
  );
};

export default Unryu;
