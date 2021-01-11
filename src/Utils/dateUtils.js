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
// May want to make offset the first argument and leave the date optional
// to make updating callsites easier
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
export const getStartOfCurrentMonthTicks = (monthOffset = 0) => {
  return getMonthUTCTicks(new Date(), monthOffset);
};

// TODO: Replace all usages of this with getMonthUTCTicks
export const getStartOfMonthTicks = (year, month, monthOffset = 0) => {
  return getMonthUTCTicks(new Date(year, month), monthOffset);
};

export const getYearUTCTicks = (localDate, yearOffset = 0) => {
  const newDate = new Date(localDate.getFullYear() + yearOffset, 0);

  return getMidnightUTCTicks(newDate);
};

// TODO: Replace all usages of this with getYearUTCTicks
export const getStartOfCurrentYearTicks = (yearOffset = 0) => {
  return getYearUTCTicks(new Date(), yearOffset);
};

export const ticksToISODateString = (ticks) => {
  return new Date(ticks).toISOString().slice(0, 10);
};

export const ISODateStringToTicks = (isoString) => {
  return new Date(isoString).getTime();
};

export const ticksToFullDate = (ticks) => {
  const utcDate = new Date(ticks);
  const options = { month: "long", day: "2-digit", year: "numeric", timeZone: "UTC" };
  return new Intl.DateTimeFormat(undefined, options).format(utcDate);
};

export const ticksToShortDate = (ticks) => {
  return new Date(ticks).toUTCString().slice(5, 11);
};

export const ticksToShortDateWithYear = (ticks) => {
  return new Date(ticks).toUTCString().slice(5, 16);
};
