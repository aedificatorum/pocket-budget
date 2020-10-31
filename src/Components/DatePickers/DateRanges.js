import { getTomorrowTicks, getStartOfMonthTicks, getStartOfYearTicks } from "../../Utils/dateUtils";

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
    fromTicks: getStartOfYearTicks(),
    // We add one day to take us to UTC midnight 'tomorrow'
    toTicks: getTomorrowTicks(),
  };
};

const lastThreeCalendarMonths = () => {
  return {
    key: "LastThreeCalendarMonths",
    shortName: "Last 3 Months",
    fromTicks: getStartOfMonthTicks(-3),
    toTicks:getStartOfMonthTicks(),
  };
};

const lastYear = () => {
  return {
    key: "LastYear",
    shortName: "Last Year",
    fromTicks: getStartOfYearTicks(-1),
    toTicks: getStartOfYearTicks(),
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
