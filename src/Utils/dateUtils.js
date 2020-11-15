import moment from "moment";

export const getToday = () => {
  const localToday = moment();

  return moment.utc([localToday.year(), localToday.month(), localToday.date(), 0, 0, 0, 0]);
};

export const getTodayTicks = (dayOffset = 0) => {
  return getToday().add(dayOffset, "day").unix() * 1000;
};

export const getStartOfCurrentMonth = (monthOffset = 0) => {
  const localToday = moment();

  return moment
    .utc([localToday.year(), localToday.month(), 1, 0, 0, 0, 0])
    .add(monthOffset, "month");
};

export const getStartOfCurrentMonthTicks = (monthOffset = 0) => {
  return getStartOfCurrentMonth(monthOffset).unix() * 1000;
};

export const getStartOfCurrentYear = (yearOffset = 0) => {
  const localToday = moment();

  return moment.utc([localToday.year(), 0, 1, 0, 0, 0, 0]).add(yearOffset, "year");
};

export const getStartOfCurrentYearTicks = (yearOffset = 0) => {
  return getStartOfCurrentYear(yearOffset).unix() * 1000;
};

export const getStartOfMonthTicks = (year, month, monthOffset = 0) => {
  return moment.utc([year, month, 1]).add(monthOffset, "month").unix() * 1000;
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
