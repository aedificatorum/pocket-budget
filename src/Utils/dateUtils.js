import moment from "moment";

export const getToday = () => {
  const localToday = moment();

  return moment.utc([localToday.year(), localToday.month(), localToday.date(), 0, 0, 0, 0]);
};

export const getTodayTicks = () => {
  return getToday().unix() * 1000;
};

export const ticksToISODateString = ticks => {
  return moment.utc(ticks).format("YYYY-MM-DD");
};

export const ISODateStringToTicks = isoString => {
  return moment.utc(isoString).unix() * 1000;
};

export const ticksToShortDate = ticks => {
  return moment.utc(ticks).format("DD MMM");
};

export const ticksToShortDateWithYear = ticks => {
  return moment.utc(ticks).format("DD MMM YYYY");
};
