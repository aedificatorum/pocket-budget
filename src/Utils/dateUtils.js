import moment from "moment";

export const getUTCTicksFromLocalDate = date => {
  const dateMoment = moment.utc(date);
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
  return moment
    .utc()
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0);
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