import React, { useState, useEffect } from "react";
import moment from "moment";
import styled from "styled-components";
import MonthPicker from "./MonthPicker";
import { ticksToShortDateWithYear, getToday } from "../../Utils/dateUtils";

const SelectYourViewStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: .5rem 1rem .5rem 1rem;
  font: 1.25rem;
  margin-bottom: 1.25rem;
  /* border: black solid 0.625rem; */
  /* box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); */
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
`;

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
        fromTicks:
          moment.utc([yearMonth.year, yearMonth.month, 1]).unix() * 1000,
        toTicks:
          moment
            .utc([yearMonth.year, yearMonth.month, 1])
            .add(1, "month")
            .unix() * 1000
      });
    }
  }, [
    ticks.fromTicks,
    ticks.toTicks,
    yearMonth.year,
    yearMonth.month,
    setTicks
  ]);

  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-around", marginBottom:"1rem"}}>
    <MonthPicker yearMonth={yearMonth} updateMonth={updateMonth} />
    <button onClick={() => setIsExpanded(e => !e)} style={{display:"block", fontSize: "1.5rem"}}>➕</button>
      </div>
    <div style={{ display: isExpanded? "block": "none"}}>
      <SelectYourViewStyle>
        <div style={{alignSelf: "center"}}>Select your view</div>
        <select onChange={handleRangeChange} style={{textAlign: "right", padding: ".75rem", backgroundColor: "white"}}>
          <option value={DateRanges.CalendarMonth}>Month</option>
          <option value={DateRanges.YearToDate}>Year to Date</option>
          <option value={DateRanges.LastThreeCalendarMonths}>
            Last 3 Months
          </option>
          <option value={DateRanges.LastYear}>Last Year</option>
        </select>
      </SelectYourViewStyle>
    </div>
      {/* {rangeType === DateRanges.CalendarMonth && (
        <MonthPicker yearMonth={yearMonth} updateMonth={updateMonth} />
      )} */}
      {rangeType !== DateRanges.CalendarMonth && (
        <div style={{ textAlign: "center", font:"1.25rem", fontWeight:"600" }}>
          {ticksToShortDateWithYear(ticks.fromTicks)} -{" "}
          {ticksToShortDateWithYear(ticks.toTicks)}
        </div>
      )}
    </div>
  );
};

export default PeriodPicker;
