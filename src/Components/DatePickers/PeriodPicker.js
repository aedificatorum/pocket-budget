import React, { useState, useEffect } from "react";
import moment from "moment";
import MonthPicker from "./MonthPicker";
import {
  ticksToShortDateWithYear,
  getToday
} from "../../Utils/dateUtils";

const DateRanges = {
  CalendarMonth: "calendarmonth",
  YearToDate: "ytd",
  LastCalendarMonth: "lastcalendarmonth",
  LastThreeCalendarMonths: "lastthreecalendarmonths",
  LastYear: "lastyear"
};

const today = new Date();
const todayUtc = getToday();
const startOfYearTicks = moment.utc([today.getFullYear(), 0, 1]).unix() * 1000;
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
          fromTicks: startOfYearTicks,
          // We add one day to take us to UTC midnight 'tomorrow'
          toTicks: todayUtc.add(1, "day").unix() * 1000
        });
        break;
      case DateRanges.LastCalendarMonth:
        setTicks({
          fromTicks:
            getToday()
              .date(1)
              .add(-1, "month")
              .unix() * 1000,
          toTicks:
            getToday()
              .date(1)
              .unix() * 1000
        });
        break;
      case DateRanges.LastThreeCalendarMonths:
        setTicks({
          fromTicks:
            getToday()
              .date(1)
              .add(-3, "month")
              .unix() * 1000,
          toTicks:
            getToday()
              .date(1)
              .unix() * 1000
        });
        break;
      case DateRanges.LastYear:
        setTicks({
          fromTicks: moment.utc([today.getFullYear() - 1, 0, 1]).unix() * 1000,
          toTicks: startOfYearTicks
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
      setTicks({
        fromTicks: moment.utc([yearMonth.year, yearMonth.month, 1]).unix() * 1000,
        toTicks:
          moment
            .utc([yearMonth.year, yearMonth.month, 1])
            .add(1, "month")
            .unix() * 1000
      });
    }
  }, [ticks.fromTicks, ticks.toTicks, yearMonth.year, yearMonth.month, setTicks]);

  return (
    <div>
      <select onChange={handleRangeChange}>
        <option value={DateRanges.CalendarMonth}>Month</option>
        <option value={DateRanges.YearToDate}>Year to Date</option>
        <option value={DateRanges.LastCalendarMonth}>Last Month</option>
        <option value={DateRanges.LastThreeCalendarMonths}>
          Last 3 Months
        </option>
        <option value={DateRanges.LastYear}>Last Year</option>
      </select>
      {rangeType === DateRanges.CalendarMonth && (
        <MonthPicker yearMonth={yearMonth} updateMonth={updateMonth} />
      )}
      <div>
        {ticksToShortDateWithYear(ticks.fromTicks)} -{" "}
        {ticksToShortDateWithYear(ticks.toTicks)}
      </div>
    </div>
  );
};

export default PeriodPicker;
