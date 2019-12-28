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
