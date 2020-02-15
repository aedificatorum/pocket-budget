import React, { useState, useEffect } from "react";
import moment from "moment";
import MonthPicker from "./MonthPicker";
import { ticksToShortDateWithYear } from "../../Utils/dateUtils";
import { SelectYourViewStyle } from "./PeriodPicker.styles";
import { DateRanges as DateRangeCreator } from "./DateRanges";

const DateRanges = DateRangeCreator();

const today = new Date();

const PeriodPicker = ({ ticks, setTicks }) => {
  // *** Year-Month Code ***
  const [yearMonth, setYearMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const setTicksToMonth = (year, month) => {
    setTicks({
      fromTicks: moment.utc([year, month, 1]).unix() * 1000,
      toTicks:
        moment
          .utc([year, month, 1])
          .add(1, "month")
          .unix() * 1000,
    });
  };

  const updateMonth = (year, month) => {
    setYearMonth({ year, month });
    setTicksToMonth(year, month);
  };
  // END: *** Year-Month Code ***

  // *** Range picker Code ***
  const [rangeType, setRangeType] = useState(DateRanges.CalendarMonth.key);

  const handleRangeChange = e => {
    const oldValue = rangeType;
    const newValue = e.target.value;

    switch (newValue) {
      case DateRanges.CalendarMonth.key:
        // update the values of ticks to match the currently selected month
        if (oldValue !== DateRanges.CalendarMonth.key) {
          setTicksToMonth(yearMonth.year, yearMonth.month);
        }
        break;
      default:
        const range = DateRanges[newValue];
        setTicks({fromTicks: range.fromTicks, toTicks: range.toTicks});
    }

    setRangeType(newValue);
  };
  // END: *** Range picker Code ***

  // If the component is mounting for the first time
  //   Default to the current month
  useEffect(() => {
    if (ticks.fromTicks === null || ticks.toTicks === null) {
      setTicks({
        fromTicks: moment.utc([yearMonth.year, yearMonth.month, 1]).unix() * 1000,
        toTicks:
          moment
            .utc([yearMonth.year, yearMonth.month, 1])
            .add(1, "month")
            .unix() * 1000,
      });
    }
  }, [ticks.fromTicks, ticks.toTicks, yearMonth.year, yearMonth.month, setTicks]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {rangeType === DateRanges.CalendarMonth.key && (
          <MonthPicker yearMonth={yearMonth} updateMonth={updateMonth} />
        )}
        <div>
          <SelectYourViewStyle>
            <select value={rangeType} onChange={handleRangeChange}>
              <option value={"select"} disabled>
                Select your view
              </option>
              {Object.values(DateRanges).map(dr => {
                return <option key={dr.shortName} value={dr.key}>{dr.shortName}</option>
              })}
            </select>
          </SelectYourViewStyle>
        </div>
      </div>

      <div style={{ textAlign: "center", font: "1.25rem", fontWeight: "600" }}>
        {ticksToShortDateWithYear(ticks.fromTicks)} - {ticksToShortDateWithYear(ticks.toTicks)}
      </div>
    </div>
  );
};

export default PeriodPicker;
