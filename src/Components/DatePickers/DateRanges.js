import {
  getTodayTicks,
  getStartOfCurrentMonthTicks,
  getStartOfCurrentYearTicks,
} from "../../Utils/dateUtils";

const calendarMonth = () => {
  return {
    key: "CalendarMonth",
    shortName: "Month",
  };
};

const yearToDate = () => {
  return {
    key: "YearToDate",
    shortName: "Year to Date",
    fromTicks: getStartOfCurrentYearTicks(),
    // We add one day to take us to UTC midnight 'tomorrow'
    toTicks: getTodayTicks(1),
  };
};

const lastThreeCalendarMonths = () => {
  return {
    key: "LastThreeCalendarMonths",
    shortName: "Last 3 Months",
    fromTicks: getStartOfCurrentMonthTicks(-3),
    toTicks: getStartOfCurrentMonthTicks(),
  };
};

const lastYear = () => {
  return {
    key: "LastYear",
    shortName: "Last Year",
    fromTicks: getStartOfCurrentYearTicks(-1),
    toTicks: getStartOfCurrentYearTicks(),
  };
};

export const DateRanges = () => {
  return {
    CalendarMonth: calendarMonth(),
    YearToDate: yearToDate(),
    LastThreeCalendarMonths: lastThreeCalendarMonths(),
    LastYear: lastYear(),
  };
};
