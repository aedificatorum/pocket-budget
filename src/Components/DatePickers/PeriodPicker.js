import React, { useState, useEffect } from "react";
import moment from "moment";
import MonthPicker from "./MonthPicker";
import { ticksToShortDateWithYear } from "../../Utils/dateUtils"

const DateRanges = {
  CalendarMonth: "calendarmonth",
  YearToDate: "ytd",
  LastYear: "lastyear"
};

const today = new Date();
const PeriodPicker = ({ ticks, setTicks }) => {
  // *** Year-Month Code ***
  const [yearMonth, setYearMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth()
  });

  const setTicksToMonth = (year, month) => {
    setTicks({
      fromTicks: moment.utc([year, month, 1]).unix() * 1000,
      toTicks:
        moment
          .utc([year, month, 1])
          .add(1, "month")
          .unix() * 1000
    });
  };

  const updateMonth = (year, month) => {
    setYearMonth({ year, month });
    setTicksToMonth(year, month);
  };
  // END: *** Year-Month Code ***

  // *** Range picker Code ***
  const [rangeType, setRangeType] = useState(DateRanges.CalendarMonth);

  const handleRangeChange = e => {
    const oldValue = rangeType;
    const newValue = e.target.value;

    switch (newValue) {
      case DateRanges.CalendarMonth:
        // update the values of ticks to match the currently selected month
        if (oldValue !== DateRanges.CalendarMonth) {
          setTicksToMonth(yearMonth.year, yearMonth.month);
        }
        break;
      case DateRanges.YearToDate:
        setTicks({
          fromTicks: moment.utc([today.getFullYear(), 0, 1]).unix() * 1000,
          // We add one day to take us to UTC midnight 'tomorrow'
          toTicks:
            moment
              .utc([today.getFullYear(), today.getMonth(), today.getDate()])
              .add(1, "day")
              .unix() * 1000
        });
        break;
      case DateRanges.LastYear:
        setTicks({
          fromTicks: moment.utc([today.getFullYear() - 1, 0, 1]).unix() * 1000,
          toTicks: moment.utc([today.getFullYear(), 0, 1]).unix() * 1000
        });
        break;
      default:
        break;
    }

    setRangeType(newValue);
  };

  // END: *** Range picker Code ***

  // If the component is mounting for the first time
  //   Default to the current month
  useEffect(() => {
    if (ticks.fromTicks === null || ticks.toTicks === null) {
      setTicksToMonth(yearMonth.year, yearMonth.month);
    }
  }, []);

  return (
    <div>
      <select onChange={handleRangeChange}>
        <option value={DateRanges.CalendarMonth}>Month</option>
        <option value={DateRanges.YearToDate}>Year to Date</option>
        <option value={DateRanges.LastYear}>Last Year</option>
      </select>
      {rangeType === DateRanges.CalendarMonth && (
        <MonthPicker yearMonth={yearMonth} updateMonth={updateMonth} />
      )}
      <div>
        {ticksToShortDateWithYear(ticks.fromTicks)} - {ticksToShortDateWithYear(ticks.toTicks)}
      </div>
    </div>
  );
};

export default PeriodPicker;
