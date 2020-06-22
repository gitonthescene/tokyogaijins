// @flow
import React, { useCallback, useEffect } from "react";
import type { Node } from "react";

import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import json2mq from "json2mq";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import EventSelect, { event_def } from "./EventSelect";
import EventOptions from "./EventOptions";
import ContactDetails, { contactDetails_def } from "./ContactDetails";
import CondDisplay from "./components/CondDisplay";
import Entry from "./components/Entry";
import { renderMail } from "./ConfirmationMail";
import { buttonSize } from "./Payment";
import { calcCost } from "./Bill";
import type { ReservationInfoType } from "./types";
import type { Options as OptionsType } from "./EventOptions";

import { debug as DEBUG } from "./config.json";
import { COMMENT_MAX_LENGTH } from "./constants";
import {
  borderOnErrors,
  logSignup,
  postMail,
  isBooked,
  fetchres,
  prettyMoney,
} from "./utils";
import { optdefaults } from "./EventOptions";

const Xbox = ({ name, label, state, toggleCheck, errors, ...props }) => {
  return (
    <div style={borderOnErrors(name, errors)}>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            checked={state}
            onChange={toggleCheck}
            {...props}
          />
        }
        label={label}
      />
    </div>
  );
};

const Discounts = ({ discount, handleChange, ifavail }) => {
  const Option = ({ value, ...props }) =>
    ifavail(value) ? (
      <FormControlLabel value={value} control={<Radio />} {...props} />
    ) : null;

  return (
    <RadioGroup
      aria-label="discount"
      name="discount"
      value={discount}
      onChange={handleChange}
    >
      <Option value="beginner" label="Beginner" />
      <Option value="birthday" label="Birthday" />
      <Option value="regularmember" label="Regular member" />
      <Option value="earlybird" label="Early bird" />
      <Option value="group" label="Group" />
      <Option value="none" label="None" />
    </RadioGroup>
  );
};

export const defaults = () => {
  return {
    event: event_def(),
    contact: contactDetails_def(),
    fees: {},
    other: {
      comments: "",
      consent: false,
      discount: "none",
      discountOptions: undefined,
      prices: undefined,
    },
  };
};

const availableDiscounts = (state) => (nm) => {
  const { discountOptions } = state.other;
  const { count } = state.contact;
  if (!discountOptions) return undefined;

  if (nm === "earlybird" && discountOptions.earlybird) {
    const { date } = discountOptions.earlybird;
    const deadline = Date.parse(date);
    return !isNaN(deadline) && Date.now() < deadline ? true : false;
  }
  if (nm === "group" && discountOptions.group) {
    const { size } = discountOptions.group;
    return count >= size ? true : false;
  }
  return nm === "none" || discountOptions[nm] !== undefined;
};

const Reservation = ({
  openDialog,
  event,
  updateEvent,
}: ReservationInfoType<OptionsType>): Node => {
  const { register, handleSubmit, errors } = useForm();

  const booked = isBooked(event);
  const history = useHistory();
  const matches = useMediaQuery(json2mq({ minWidth: 750 }));

  const updateSubField = useCallback(
    (key) => (cb) => {
      updateEvent((draft) => {
        cb(draft[key]);
      });
    },
    [updateEvent]
  );

  // Using immer and useCallback here because we want to set state in useEffect for setEventOptions
  const updateEventinfo = useCallback(updateSubField("event"), [
    updateSubField,
  ]);
  const updateContactinfo = useCallback(updateSubField("contact"), [
    updateSubField,
  ]);
  const updateEventFees = useCallback(updateSubField("fees"), [updateSubField]);
  const updateOther = useCallback(updateSubField("other"), [updateSubField]);

  //  @FIX no paypal support any more
  //  useEffect(() => {
  //    if (formState.isValid) {
  //      event.other.paypalactions && event.other.paypalactions.enable();
  //    } else if (event.other.paypalactions) {
  //      event.other.paypalactions && event.other.paypalactions.disable();
  //    }
  //  }, [event.other.paypalactions, formState.isValid]);

  useEffect(() => {
    fetchres("/discountoffers.php").then((data) => {
      updateOther((draft) => {
        draft.discountOptions = data[event.event.e_id];
      });
    });
    fetchres("/prices.php").then((data) => {
      updateOther((draft) => {
        draft.prices = data;
      });
    });
  }, [event.event.e_id, updateOther]);

  const updateComments = (e) => {
    const val = e.target.value;
    updateOther((draft) => {
      if (val.length < COMMENT_MAX_LENGTH) draft.comments = val;
    });
  };

  const handleUpdate = (nm) => (e) => {
    const val = e.target.value;
    updateOther((draft) => {
      draft[nm] = val;
    });
  };

  const handleChecked = (nm) => (e) => {
    const val = e.target.checked;
    updateOther((draft) => {
      draft[nm] = val;
    });
  };

  const { total } = calcCost(event);

  const bookIt = (name) => () => {
    console.log("Booking");
    return logSignup(event, optdefaults)
      .then(() => {
        postMail(event, renderMail, "wait list");
        // Clear out event info
        updateEvent((draft) => defaults());
        openDialog("Thank you!");
      })
      .catch((e) => {
        console.log("Trouble with " + name + ":" + e.message);
      });
  };

  const validateForm = () => {
    // Check if validated, if not say so
    // validation should enable paypalactions
    handleSubmit(() => {})();
  };

  const toPayment = () => {
    return logSignup(event, optdefaults, total)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Unable to log payment request");
      })
      .then((data) => {
        if (data.ok) history.push(`/reservations/payment?u_id=${data.u_id}`);
        else throw new Error("Trouble processing log payment request");
      });
  };
  return (
    <>
      <div className="App">
        <div id="content" style={{ width: "80%", marginTop: "20px" }}>
          <h1>Event Reservation Form</h1>
          <div className="page-content">
            Please fill out the form below with your details. Only your nickname
            or first name will be shared with other participants for the same
            event. All other information provided will be treated strictly
            confidential and only used for emergency, insurance and/or
            statistical purposes.
            <CondDisplay showif={booked && event.event.e_id}>
              <div
                style={{
                  border: "solid",
                  fontStyle: "italic",
                  borderColor: "red",
                  fontSize: "18px",
                  textAlign: "center",
                  margin: "10px",
                  padding: "5px",
                }}
              >
                This event is currently full. Please fill out the information
                below to get on the waiting list.
              </div>
            </CondDisplay>
          </div>
        </div>
        <div id="content" style={{ width: "80%" }}>
          <h3>Event Details</h3>
          <div className="page-content">
            <EventSelect
              eventinfo={event.event}
              updateEventinfo={updateEventinfo}
            />
          </div>
        </div>
        <div id="content" style={{ width: "80%" }}>
          <h3>Contact Details</h3>
          <div className="page-content">
            <ContactDetails
              contactinfo={event.contact}
              updateContactinfo={updateContactinfo}
              register={register}
              errors={errors}
            />
            <div style={{ textAlign: "center" }}>
              <CondDisplay showif={booked && event.event.e_id}>
                <Button
                  name="display"
                  variant="contained"
                  onClick={handleSubmit(bookIt("waitlist"))}
                  size="large"
                  color="primary"
                  style={{
                    margin: "5px",
                    width: "50%",
                    ...buttonSize(matches),
                  }}
                >
                  Join Wait list
                </Button>
              </CondDisplay>
            </div>
          </div>
        </div>
        <CondDisplay showif={!booked}>
          <div id="content" style={{ width: "80%" }}>
            <EventOptions
              eventType={event.event.type}
              eventinfo={event}
              updateEventOptions={updateEvent}
              updateEventFees={updateEventFees}
              cnt={event.contact.count}
              register={register}
              errors={errors}
              validateForm={validateForm}
            />
          </div>
          <CondDisplay showif={event.other.discountOptions}>
            <div id="content" style={{ width: "80%" }}>
              <h3>Discounts</h3>
              <div className="page-content">
                <div
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    padding: "5px",
                    margin: "5px",
                  }}
                >
                  <div style={{ margin: "0 0 10px 0" }}>
                    <a href="/discounts.php" target="_blank">
                      Discount policy
                    </a>
                  </div>
                  <Discounts
                    discount={event.other.discount}
                    handleChange={handleUpdate("discount")}
                    ifavail={availableDiscounts(event)}
                  />
                </div>
              </div>
            </div>
          </CondDisplay>
          <div id="content" style={{ width: "80%" }}>
            <h3>Other</h3>
            <div className="page-content">
              <div
                style={{
                  display: "flex",
                  flexFlow: "column",
                  padding: "5px",
                  margin: "5px",
                }}
              >
                <Entry
                  label="Other requests / Comments / Group leader name (multiple lines ok)"
                  value={event.other.comments}
                  onChange={updateComments}
                  multiline={true}
                />
                <div style={{ margin: "50px 0 10px 0" }}>
                  <a href="/tour-conditions.php" target="_blank">
                    Tokyo Gaijins' Tour Conditions
                  </a>
                </div>
                <Xbox
                  label="I have read and understand the terms and conditions linked above"
                  state={event.other.consent}
                  toggleCheck={handleChecked("consent")}
                  errors={errors}
                  value="consent"
                  color="primary"
                  name="consent"
                  inputRef={register({ required: true })}
                />
              </div>
            </div>
          </div>
          <div id="content" style={{ width: "80%" }}>
            <h3>Total:</h3>
            <div className="page-content" style={{ textAlign: "center" }}>
              <div style={{ border: "solid", margin: "10px" }}>
                {prettyMoney(total)} yen
              </div>
              <CondDisplay showif={event.event.e_id}>
                <Button
                  name="display"
                  variant="contained"
                  onClick={handleSubmit(total ? toPayment : bookIt("reserve"))}
                >
                  {total ? "Pay" : "Reserve"}
                </Button>
              </CondDisplay>
            </div>
          </div>
        </CondDisplay>
        <CondDisplay showif={DEBUG === "true"}>
          <Button
            name="display"
            variant="contained"
            onClick={(e) => {
              console.log(renderMail(event));
              console.log(event);
            }}
          >
            click me
          </Button>
        </CondDisplay>
      </div>
    </>
  );
};

export default Reservation;
