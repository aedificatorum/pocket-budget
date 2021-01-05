import moment from "moment";

/**
 * Returns the Date.UTC value for midnight for the local date provided
 * 01:00 23rd March UTC+2 (local) will return the value for 00:00 23rd March UTC
 * (Simply converting to UTC would have returned 23:00 on the 22nd March UTC)
 * @param {Date} localDate
 */
export const getMidnightUTCTicks = (localDate) => {
  if (!localDate) {
    throw new Error("localDate must be provided");
  }

  if (!(localDate instanceof Date)) {
    throw new Error("localDate must be an instance of Date");
  }

  return Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate());
};

export const getDayUTCTicks = (localDate, dayOffset = 0) => {
  const newDate = new Date(localDate);
  newDate.setDate(newDate.getDate() + dayOffset);
  
  return getMidnightUTCTicks(newDate);
};

// TODO: Replace all usages with getDayUTCTicks
export const getTodayTicks = (dayOffset = 0) => {
  return getDayUTCTicks(new Date(), dayOffset);
};

export const getMonthUTCTicks = (localDate, monthOffset = 0) => {
  const newDate = new Date(localDate);
  newDate.setDate(1);
  newDate.setMonth(newDate.getMonth() + monthOffset);

  return getMidnightUTCTicks(newDate);
};

// TODO: Replace all usages of this with getMonthUTCTicks
const getStartOfCurrentMonth = (monthOffset = 0) => {
  return getMonthUTCTicks(new Date(), monthOffset)
};

export const getStartOfCurrentMonthTicks = (monthOffset = 0) => {
  return getStartOfCurrentMonth(monthOffset).unix() * 1000;
};

export const getStartOfMonthTicks = (year, month, monthOffset = 0) => {
  return moment.utc([year, month, 1]).add(monthOffset, "month").unix() * 1000;
};

const getStartOfCurrentYear = (yearOffset = 0) => {
  const localToday = moment();

  return moment.utc([localToday.year(), 0, 1, 0, 0, 0, 0]).add(yearOffset, "year");
};

export const getStartOfCurrentYearTicks = (yearOffset = 0) => {
  return getStartOfCurrentYear(yearOffset).unix() * 1000;
};

export const ticksToISODateString = (ticks) => {
  return moment.utc(ticks).format("YYYY-MM-DD");
};

export const ISODateStringToTicks = (isoString) => {
  return moment.utc(isoString).unix() * 1000;
};

export const ticksToFullDate = (ticks) => {
  return moment.utc(ticks).format("MMMM Do YYYY");
};

export const ticksToShortDate = (ticks) => {
  return moment.utc(ticks).format("DD MMM");
};

export const ticksToShortDateWithYear = (ticks) => {
  return moment.utc(ticks).format("DD MMM YYYY");
};
