import moment from "moment";

export const getUTCTicksFromLocalDate = date => {
  const dateMoment = moment(date);
  const dateTicks =
    moment
      .utc([
        dateMoment.year(),
        dateMoment.month(),
        dateMoment.date(),
        0,
        0,
        0,
        0
      ])
      .unix() * 1000;

  return dateTicks;
};

export const getToday = () => {
  const localToday = moment();

  return moment
    .utc([localToday.year(), localToday.month(), localToday.date(), 0, 0, 0, 0])
};

export const getTodayTicks = () => {
  return getToday().unix() * 1000;
};

export const ticksToISODateString = ticks => {
  return moment.utc(ticks).format("YYYY-MM-DD");
};

export const ticksToShortDate = ticks => {
  return moment.utc(ticks).format("DD MMM");
}