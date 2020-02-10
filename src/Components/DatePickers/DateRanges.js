import moment from "moment";
import { getToday } from "../../Utils/dateUtils";

const today = new Date();
const todayUtc = getToday();
const startOfYearTicks = moment.utc([today.getFullYear(), 0, 1]).unix() * 1000;

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
    fromTicks: startOfYearTicks,
    // We add one day to take us to UTC midnight 'tomorrow'
    toTicks: todayUtc.add(1, "day").unix() * 1000,
  };
};

const lastThreeCalendarMonths = () => {
  return {
    key: "LastThreeCalendarMonths",
    shortName: "Last 3 Months",
    fromTicks:
      getToday()
        .date(1)
        .add(-3, "month")
        .unix() * 1000,
    toTicks:
      getToday()
        .date(1)
        .unix() * 1000,
  };
};

const lastYear = () => {
  return {
    key: "LastYear",
    shortName: "Last Year",
    fromTicks: moment.utc([today.getFullYear() - 1, 0, 1]).unix() * 1000,
    toTicks: startOfYearTicks,
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
