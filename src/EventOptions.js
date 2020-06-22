// @flow
import React, { useEffect } from "react";
import type { Node } from "react";
import Camping, { campinginfo_def } from "./Camping";
import type { CampingInfo, CampingPriceInfo } from "./Camping";
import Dolphin, { dolphininfo_def } from "./Dolphin";
import type { DolphinInfo, DolphinPriceInfo } from "./Dolphin";
import SkiSnowboarding, { skisnoinfo_def } from "./SkiSnowboarding";
import type {
  SkiSnowboardingInfo,
  SkiSnowboardingPriceInfo,
} from "./SkiSnowboarding";
import SnowMonkey, { snowmonkey_def } from "./SnowMonkey";
import type { SnowMonkeyInfo, SnowMonkeyPriceInfo } from "./SnowMonkey";
import NightStay, { nightstay_def } from "./NightStay";
import type { NightStayInfo, NightStayPriceInfo } from "./NightStay";
import Zao, { zao_def } from "./Zao";
import type { ZaoInfo, ZaoPriceInfo } from "./Zao";
import Unryu, { unryu_def } from "./Unryu";
import type { UnryuInfo, UnryuPriceInfo } from "./Unryu";
import Trekking, { trekking_def } from "./Trekking";
import type { TrekkingInfo, TrekkingPriceInfo } from "./Trekking";
import Oshima, { oshima_def } from "./Oshima";
import type { OshimaInfo, OshimaPriceInfo } from "./Oshima";
import Fuji, { fuji_def } from "./Fuji";
import type { FujiInfo, FujiPriceInfo } from "./Fuji";
import CondDisplay from "./components/CondDisplay";
import PersonalDetails from "./PersonalDetails";
import type { EventOptionsType, EventStateType, OptionsType } from "./types";

type PersonalInfoType = {
  name: string,
  age: string,
  sex: string,
  cellphone: string,
  email: string,
  idx: number,
};

type OptionCatalog = {|
  camping: CampingInfo,
  dolphin: DolphinInfo,
  fuji: FujiInfo,
  general: any,
  oshima: OshimaInfo,
  snowmonkey: SnowMonkeyInfo,
  nightstay: NightStayInfo,
  skisno: SkiSnowboardingInfo,
  trekking: TrekkingInfo,
  unryu: UnryuInfo,
  zao: ZaoInfo,
|};

export type Options = OptionsType<PersonalInfoType, OptionCatalog>;

type EventKeys = $Keys<OptionCatalog>;

const personalinfo_def = (): PersonalInfoType => {
  return {
    name: "",
    age: "",
    sex: "Female",
    cellphone: "",
    email: "",
    idx: -1,
  };
};

const null_def = (): any => {
  return {};
};

// This must contain all the keys in the useEffect function below!!
export const optdefaults = {
  camping: campinginfo_def,
  dolphin: dolphininfo_def,
  fuji: fuji_def,
  general: null_def,
  oshima: oshima_def,
  snowmonkey: snowmonkey_def,
  nightstay: nightstay_def,
  skisno: skisnoinfo_def,
  trekking: trekking_def,
  unryu: unryu_def,
  zao: zao_def,
};

const resetDraft = (draft: EventStateType<Options>): void => {
  const kys = Object.keys(optdefaults);
  kys.forEach((k: EventKeys): void => {
    delete draft[k];
    delete draft.fees[k];
  });
};

const initDraft = <Opt>(
  draft: any,
  count: number,
  nm: EventKeys,
  def: () => Opt
): void => {
  resetDraft(draft);
  //const count = parseInt(cnt);
  // Fill array with copies of the return of the default function.
  // See [[https://2ality.com/2013/11/initializing-arrays.html]]
  const copyXTimes = <Return>(f: (number) => Return, c: number): Return[] => {
    const arr = Array.apply(null, Array(c)).map((x, i) => f(i));
    return arr;
  };
  const defs = copyXTimes<[PersonalInfoType, Opt]>(
    (i) => [{ ...personalinfo_def(), idx: i }, def()],
    count
  );
  const fees = copyXTimes<any>((i) => {
    return {};
  }, count);

  const draftSet = {};
  draftSet[nm] = defs;
  Object.assign(draft, draftSet);

  draftSet[nm] = fees;
  Object.assign(draft.fees, draftSet);
};

const PersonalizedOption = ({
  personalinfo,
  updatePersonalinfo,
  idx,
  children,
  contact,
  register,
  errors,
}): Node => {
  if (personalinfo === undefined) return null;

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        padding: "5px",
        margin: "5px",
      }}
    >
      <CondDisplay showif={true}>
        <PersonalDetails
          personalinfo={personalinfo}
          updatePersonalinfo={updatePersonalinfo}
          idx={idx}
          contact={contact}
          register={register}
          errors={errors}
        />
      </CondDisplay>
      {children}
    </div>
  );
};

const EventOptions = ({
  eventType,
  eventinfo,
  updateEventOptions,
  updateEventFees,
  cnt,
  register,
  errors,
}: EventOptionsType<EventStateType<Options>>): Node => {
  useEffect((): void => {
    if (eventType === "C")
      updateEventOptions((draft) => {
        initDraft(draft, cnt, "camping", optdefaults.camping);
      });
    else if (eventType === "D")
      updateEventOptions((draft) => {
        initDraft(draft, cnt, "dolphin", optdefaults.dolphin);
      });
    else if (eventType === "F")
      updateEventOptions((draft) => {
        initDraft(draft, cnt, "fuji", optdefaults.fuji);
      });
    else if (eventType === "G")
      updateEventOptions((draft) => {
        initDraft(draft, cnt, "general", optdefaults.general);
      });
    else if (eventType === "I")
      updateEventOptions((draft) => {
        initDraft(draft, cnt, "oshima", optdefaults.oshima);
      });
    else if (eventType === "M")
      updateEventOptions((draft) => {
        initDraft(draft, cnt, "snowmonkey", optdefaults.snowmonkey);
      });
    else if (eventType === "N")
      updateEventOptions((draft) => {
        initDraft(draft, cnt, "nightstay", optdefaults.nightstay);
      });
    else if (eventType === "S")
      updateEventOptions((draft) => {
        initDraft(draft, cnt, "skisno", optdefaults.skisno);
      });
    else if (eventType === "H")
      updateEventOptions((draft) => {
        initDraft(draft, cnt, "trekking", optdefaults.trekking);
      });
    else if (eventType === "U")
      updateEventOptions((draft) => {
        initDraft(draft, cnt, "unryu", optdefaults.unryu);
      });
    else if (eventType === "Z")
      updateEventOptions((draft) => {
        initDraft(draft, cnt, "zao", optdefaults.zao);
      });
    // .. else just wipe out the optkeys
    else
      updateEventOptions((draft) => {
        resetDraft(draft);
      });
  }, [eventType, updateEventOptions, cnt]);

  const updateEventFeesI = (typ, i) => (cb) => {
    updateEventFees((draft) => {
      cb(draft[typ][i]);
    });
  };

  const updateEventInfo = (typ, i) => (cb) => {
    updateEventOptions((draft: any) => {
      if (draft[typ]) cb(draft[typ][i][1]);
    });
  };

  const updatePersonalInfo = (typ, i) => (cb) => {
    updateEventOptions((draft) => {
      if (draft[typ]) cb(draft[typ][i][0]);
    });
  };

  const createElement = (typ, i, prices): Node => {
    var [el, ky] = [null, null];
    if (typ === "C") {
      ky = "camping";
      el = (
        <Camping
          info={
            eventinfo.camping && eventinfo.camping[i] && eventinfo.camping[i][1]
          }
          updateInfo={updateEventInfo("camping", i)}
          updateEventFees={updateEventFeesI("camping", i)}
          prices={(prices: CampingPriceInfo)}
        />
      );
    } else if (typ === "D") {
      ky = "dolphin";
      el = (
        <Dolphin
          info={
            eventinfo.dolphin && eventinfo.dolphin[i] && eventinfo.dolphin[i][1]
          }
          updateInfo={updateEventInfo("dolphin", i)}
          updateEventFees={updateEventFeesI("dolphin", i)}
          prices={(prices: DolphinPriceInfo)}
        />
      );
    } else if (typ === "F") {
      ky = "fuji";
      el = (
        <Fuji
          info={eventinfo.fuji && eventinfo.fuji[i] && eventinfo.fuji[i][1]}
          updateInfo={updateEventInfo("fuji", i)}
          updateEventFees={updateEventFeesI("fuji", i)}
          prices={(prices: FujiPriceInfo)}
        />
      );
    } else if (typ === "G") {
      ky = "general";
      el = null;
    } else if (typ === "I") {
      ky = "oshima";
      el = (
        <Oshima
          info={
            eventinfo.oshima && eventinfo.oshima[i] && eventinfo.oshima[i][1]
          }
          updateInfo={updateEventInfo("oshima", i)}
          updateEventFees={updateEventFeesI("oshima", i)}
          prices={(prices: OshimaPriceInfo)}
        />
      );
    } else if (typ === "M") {
      ky = "snowmonkey";
      el = (
        <SnowMonkey
          info={
            eventinfo.snowmonkey &&
            eventinfo.snowmonkey[i] &&
            eventinfo.snowmonkey[i][1]
          }
          updateInfo={updateEventInfo("snowmonkey", i)}
          updateEventFees={updateEventFeesI("snowmonkey", i)}
          prices={(prices: SnowMonkeyPriceInfo)}
        />
      );
    } else if (typ === "N") {
      ky = "nightstay";
      el = (
        <NightStay
          info={
            eventinfo.nightstay &&
            eventinfo.nightstay[i] &&
            eventinfo.nightstay[i][1]
          }
          updateInfo={updateEventInfo("nightstay", i)}
          updateEventFees={updateEventFeesI("nightstay", i)}
          prices={(prices: NightStayPriceInfo)}
        />
      );
    } else if (typ === "S") {
      ky = "skisno";
      el = (
        <SkiSnowboarding
          info={
            eventinfo.skisno && eventinfo.skisno[i] && eventinfo.skisno[i][1]
          }
          updateInfo={updateEventInfo("skisno", i)}
          updateEventFees={updateEventFeesI("skisno", i)}
          prices={(prices: SkiSnowboardingPriceInfo)}
        />
      );
    } else if (typ === "H") {
      ky = "trekking";
      el = (
        <Trekking
          info={
            eventinfo.trekking &&
            eventinfo.trekking[i] &&
            eventinfo.trekking[i][1]
          }
          updateInfo={updateEventInfo("trekking", i)}
          updateEventFees={updateEventFeesI("trekking", i)}
          prices={(prices: TrekkingPriceInfo)}
        />
      );
    } else if (typ === "U") {
      ky = "unryu";
      el = (
        <Unryu
          info={eventinfo.unryu && eventinfo.unryu[i] && eventinfo.unryu[i][1]}
          updateInfo={updateEventInfo("unryu", i)}
          updateEventFees={updateEventFeesI("unryu", i)}
          prices={(prices: UnryuPriceInfo)}
        />
      );
    } else if (typ === "Z") {
      ky = "zao";
      el = (
        <Zao
          info={eventinfo.zao && eventinfo.zao[i] && eventinfo.zao[i][1]}
          updateInfo={updateEventInfo("zao", i)}
          updateEventFees={updateEventFeesI("zao", i)}
          prices={(prices: ZaoPriceInfo)}
        />
      );
    } else return null;

    return (
      <PersonalizedOption
        personalinfo={eventinfo[ky] && eventinfo[ky][i] && eventinfo[ky][i][0]}
        updatePersonalinfo={updatePersonalInfo(ky, i)}
        contact={eventinfo.contact}
        idx={i}
        key={i}
        register={register}
        errors={errors}
      >
        {el}
      </PersonalizedOption>
    );
  };

  // Default prices overriden by event specific prices
  const prices = eventinfo.other.prices
    ? {
        ...eventinfo.other.prices.bytype[eventType],
        ...eventinfo.other.prices.byevent[eventinfo.event.e_id],
      }
    : {};

  var cldrn = [];
  for (var i = 0; i < cnt; ++i) {
    const child = createElement(eventType, i, prices);
    if (child != null) cldrn.push(child);
  }

  return cldrn.length ? (
    <>
      <h3>Participant Details</h3>
      <div className="page-content">{cldrn}</div>
    </>
  ) : null;
};

export default EventOptions;
