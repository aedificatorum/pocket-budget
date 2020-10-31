import moment from "moment";

export const getToday = () => {
  const localToday = moment();

  return moment.utc([localToday.year(), localToday.month(), localToday.date(), 0, 0, 0, 0]);
};

export const getTomorrowTicks = () => {
  return getToday().add(1, "day").unix() * 1000;
};

export const getStartOfMonth = (monthOffset = 0) => {
  const localToday = moment();

  return moment
    .utc([localToday.year(), localToday.month(), 1, 0, 0, 0, 0])
    .add(monthOffset, "month");
};

export const getStartOfMonthTicks = (monthOffset = 0) => {
  return getStartOfMonth(monthOffset).unix() * 1000;
};

export const getStartOfYear = (yearOffset = 0) => {
  const localToday = moment();

  return moment.utc([localToday.year(), 0, 1, 0, 0, 0, 0]).add(yearOffset, "year");
};

export const getStartOfYearTicks = (yearOffset = 0) => {
  return getStartOfYear(yearOffset).unix() * 1000;
};

export const getTodayTicks = () => {
  return getToday().unix() * 1000;
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
