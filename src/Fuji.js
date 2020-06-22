// @flow
import React from "react";
import type { Node } from "react";

import CondDisplay from "./components/CondDisplay";
import Choice from "./components/Choice";
import type { EventInfoType } from "./types";

import { YesNo } from "./constants";
import {
  createOnChange,
  clearCombo,
  restoreComboElements,
  calcComboSideEffect,
} from "./utils";

type FujiInfo = {
  guide_hike: string,
  fullset: string,
  rainjacketpants: string,
  hikingshoes: string,
  backpackcover: string,
  hikingpoles: string,
  headlamp: string,
  gaiters: string,
};

export type FujiPriceInfo = {
  guide_hike: any,
  fullset: any,
  rainjacketpants: any,
  hikingshoes: any,
  backpackcover: any,
  hikingpoles: any,
  headlamp: any,
  gaiters: any,
};

export const fuji_def = () => {
  return {
    guide_hike: "No (hike at your own risk)",
    fullset: "No",
    rainjacketpants: "No",
    hikingshoes: "No",
    backpackcover: "No",
    hikingpoles: "No",
    headlamp: "No",
    gaiters: "No",
  };
};

const hikingClearCombo = clearCombo("fullset", [
  "rainjacketpants",
  "backpackcover",
  "gaiters",
  "hikingshoes",
  "hikingpoles",
  "headlamp",
]);
const getHikingSideEffect = calcComboSideEffect("fullset", [
  "rainjacketpants",
  "backpackcover",
  "gaiters",
  "hikingshoes",
  "hikingpoles",
  "headlamp",
]);

// Changes to the general state if one state changes
export const getSideEffect = (nm, val, state) => {
  const hikingSideEffect = getHikingSideEffect(nm, val, state);
  return hikingSideEffect;
};

const Fuji = ({
  info,
  updateInfo,
  updateEventFees,
  prices,
}: EventInfoType<FujiInfo, FujiPriceInfo>): Node => {
  let fujiinfo = info;
  let updateFujiinfo = updateInfo;
  if (fujiinfo === undefined) return null;

  const hikingRestoreCombo = restoreComboElements(
    "fullset",
    [
      "rainjacketpants",
      "backpackcover",
      "gaiters",
      "hikingshoes",
      "hikingpoles",
      "headlamp",
    ],
    prices
  );

  const combo = {
    clearComboAll: (draft) => {
      hikingClearCombo(draft);
    },

    restoreComboElementsAll: (state, sideEffect) => {
      const hikingPrcUpd = hikingRestoreCombo(state, sideEffect);
      return hikingPrcUpd;
    },
  };

  const onChange = createOnChange(
    fujiinfo,
    updateFujiinfo,
    updateEventFees,
    prices,
    combo,
    getSideEffect
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
        nm="guide_hike"
        items={["Yes", "No (hike at your own risk)"]}
        value={fujiinfo.guide_hike}
        label="Mt. Fuji Certified Hike Guide"
        onChange={onChange("guide_hike")}
        price={prices.guide_hike}
      />
      <Choice
        nm="fullset"
        items={YesNo}
        value={fujiinfo.fullset}
        label="Fullset"
        onChange={onChange("fullset")}
        price={prices.fullset}
      />
      <CondDisplay
        showif={fujiinfo.fullset === "No"}
        comment="If using CondDisplay, then you can't unchoose after selecting all"
      >
        <div
          style={{ display: "flex", flexFlow: "column", marginLeft: "10px" }}
        >
          <Choice
            nm="rainjacketpants"
            items={YesNo}
            value={fujiinfo.rainjacketpants}
            label="Rain jacket and pants *Gore-Tex technology or equivalent"
            onChange={onChange("rainjacketpants")}
            price={prices.rainjacketpants}
          />
          <Choice
            nm="hikingshoes"
            items={YesNo}
            value={fujiinfo.hikingshoes}
            label="Hiking/trekking shoes *Gore-Tex technology or equivalent"
            onChange={onChange("hikingshoes")}
            price={prices.hikingshoes}
          />
          <Choice
            nm="backpackcover"
            items={YesNo}
            value={fujiinfo.backpackcover}
            label="Backpack with rain cover"
            onChange={onChange("backpackcover")}
            price={prices.backpackcover}
          />
          <Choice
            nm="hikingpoles"
            items={YesNo}
            value={fujiinfo.hikingpoles}
            label="Hiking/trekking poles"
            onChange={onChange("hikingpoles")}
            price={prices.hikingpoles}
          />
          <Choice
            nm="headlamp"
            items={YesNo}
            value={fujiinfo.headlamp}
            label="Headlamp"
            onChange={onChange("headlamp")}
            price={prices.headlamp}
          />
          <Choice
            nm="gaiters"
            items={YesNo}
            value={fujiinfo.gaiters}
            label="Gaiters"
            onChange={onChange("gaiters")}
            price={prices.gaiters}
          />
        </div>
      </CondDisplay>
    </div>
  );
};

export default Fuji;
