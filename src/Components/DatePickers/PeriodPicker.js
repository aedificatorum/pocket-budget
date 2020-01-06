import React, { useState, useEffect } from "react";
import moment from "moment";
import MonthPicker from "./MonthPicker";

const today = new Date();
const PeriodPicker = ({ ticks, setTicks }) => {
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
  }

  const updateMonth = (year, month) => {
    setYearMonth({ year, month });
    setTicksToMonth(year, month);
  };

  // If the component is mounting for the first time
  //   Default to the current month
  useEffect(() => {
    if (ticks.fromTicks === null || ticks.toTicks === null) {
      setTicksToMonth(yearMonth.year, yearMonth.month);
    }
  }, []);

  return <MonthPicker yearMonth={yearMonth} updateMonth={updateMonth} />;
};

export default PeriodPicker;
