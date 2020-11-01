import React, { useState, useEffect } from "react";
import MonthPicker from "./MonthPicker";
import { ticksToShortDateWithYear, getStartOfMonthTicks } from "../../Utils/dateUtils";
import { SelectYourViewStyle, FilterContainer } from "./PeriodPicker.styles";
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
      fromTicks: getStartOfMonthTicks(year, month),
      toTicks: getStartOfMonthTicks(year, month, 1),
    });
  };

  const updateMonth = (year, month) => {
    setYearMonth({ year, month });
    setTicksToMonth(year, month);
  };
  // END: *** Year-Month Code ***

  // *** Range picker Code ***
  const [rangeType, setRangeType] = useState(DateRanges.CalendarMonth.key);

  const handleRangeChange = (e) => {
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
        setTicks({ fromTicks: range.fromTicks, toTicks: range.toTicks });
    }

    setRangeType(newValue);
  };
  // END: *** Range picker Code ***

  // If the component is mounting for the first time
  //   Default to the current month
  useEffect(() => {
    if (ticks.fromTicks === null || ticks.toTicks === null) {
      setTicks({
        fromTicks: getStartOfMonthTicks(yearMonth.year, yearMonth.month),
        toTicks: getStartOfMonthTicks(yearMonth.year, yearMonth.month, 1),
      });
    }
  }, [ticks.fromTicks, ticks.toTicks, yearMonth.year, yearMonth.month, setTicks]);

  return (
    <FilterContainer>
      {rangeType === DateRanges.CalendarMonth.key && (
        <MonthPicker yearMonth={yearMonth} updateMonth={updateMonth} />
      )}
      <div style={{ textAlign: "center", fontSize: "1.25rem", padding: ".5rem" }}>
        {ticksToShortDateWithYear(ticks.fromTicks)} - {ticksToShortDateWithYear(ticks.toTicks)}
      </div>
      <SelectYourViewStyle>
        <select value={rangeType} onChange={handleRangeChange}>
          <option value={"select"} disabled>
            Select your view
          </option>
          {Object.values(DateRanges).map((dr) => {
            return (
              <option key={dr.shortName} value={dr.key}>
                {dr.shortName}
              </option>
            );
          })}
        </select>
      </SelectYourViewStyle>
    </FilterContainer>
  );
};

export default PeriodPicker;
