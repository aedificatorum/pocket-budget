import * as tzm from "timezone-mock";
import * as dt from "./dateUtils";

/*
- All dates stored as UTC midnight

- User is in France, it's 00:30 local time (UTC+1) on the 1st Jan
- This is 23:30 the _day before_ in UTC (31st Dec)
- We want to persist this date as the 31st December (UTC) - NOT 1st Jan

*/

const getLocalMidnight = (localDate) => {
  const newDate = new Date(localDate);

  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  return newDate;
};

it("timezone mocking works as expected", () => {
  tzm.register("US/Eastern");

  let d = new Date("2020-12-31T23:00:00.000-05:00");
  expect(d.getTimezoneOffset()).toBe(300); // -5 hours from UTC
  expect(d.getHours()).toBe(23); // 11pm local time
  expect(d.getUTCHours()).toBe(4); // 4am UTC time...
  expect(d.getDate()).toBe(31); // ...the next day
  expect(d.getUTCDate()).toBe(1);

  tzm.unregister();
});

it("getTodayTicks works in the UTC timezone", () => {
  tzm.register("UTC");

  const today = getLocalMidnight(new Date());
  const computedTicks = today.getTime();

  const todayTicks = dt.getTodayTicks();

  expect(todayTicks).toBe(computedTicks);

  tzm.unregister();
});

it("getMidnightUTCTicks works in the UTC timezone", () => {
  tzm.register("UTC");

  const today = new Date();
  const computedTicks = getLocalMidnight(today).getTime();

  const midnightTicks = dt.getMidnightUTCTicks(today);

  expect(midnightTicks).toBe(computedTicks);

  tzm.unregister();
});

it("getMidnightUTCTicks works in a timezone that would be the wrong day if converted to UTC directly", () => {
  tzm.register("US/Eastern");

  const testDate = new Date(2020, 0, 2, 23); // 11PM EST -> 4AM UTC D+1
  const incorrectMidnight = Date.UTC(2020, 0, 3);
  const correctMidnight = Date.UTC(2020, 0, 2);

  const midnightTicks = dt.getMidnightUTCTicks(testDate);
  // Naïve conversion to UTC - we end up with the next day
  const incorrectConvertedMidnight = Date.UTC(
    testDate.getUTCFullYear(),
    testDate.getUTCMonth(),
    testDate.getUTCDate()
  );

  expect(incorrectMidnight).toBe(incorrectConvertedMidnight);
  expect(midnightTicks).toBe(correctMidnight);

  tzm.unregister();
});

it("getDayUTCTicks works for various offsets", () => {
  tzm.register("UTC");
  const startDate = new Date(2020, 0, 1);

  const sameDay = Date.UTC(2020, 0, 1);
  const nextDay = Date.UTC(2020, 0, 2);
  const previousDay = Date.UTC(2019, 11, 31);
  const sixtyDaysLater = Date.UTC(2020, 2, 1);

  const sameDayTicks = dt.getDayUTCTicks(startDate, 0);
  const nextDayTicks = dt.getDayUTCTicks(startDate, 1);
  const previousDayTicks = dt.getDayUTCTicks(startDate, -1);
  const sixtyDaysLaterTicks = dt.getDayUTCTicks(startDate, 60);

  expect(sameDayTicks).toBe(sameDay);
  expect(nextDayTicks).toBe(nextDay);
  expect(previousDayTicks).toBe(previousDay);
  expect(sixtyDaysLaterTicks).toBe(sixtyDaysLater);

  tzm.unregister();
});

it("getMonthUTCTicks works for various offsets", () => {
  tzm.register("UTC");

  const startDate = new Date(2020, 1, 29); // leap year

  const startOfMonth = Date.UTC(2020, 1, 1);
  const startOfPriorMonth = Date.UTC(2020, 0, 1);
  const startOfNextMonth = Date.UTC(2020, 2, 1);
  const startOfTwelveMonthsAgo = Date.UTC(2019, 1, 1);

  const startOfMonthTicks = dt.getMonthUTCTicks(startDate, 0);
  const startOfPriorMonthTicks = dt.getMonthUTCTicks(startDate, -1);
  const startOfNextMonthTicks = dt.getMonthUTCTicks(startDate, 1);
  const startOfTwelveMonthsAgoTicks = dt.getMonthUTCTicks(startDate, -12);

  expect(startOfMonthTicks).toBe(startOfMonth);
  expect(startOfPriorMonthTicks).toBe(startOfPriorMonth);
  expect(startOfNextMonthTicks).toBe(startOfNextMonth);
  expect(startOfTwelveMonthsAgoTicks).toBe(startOfTwelveMonthsAgo);

  tzm.unregister();
});

it("getYearUTCTicks works for various offsets", () => {
  tzm.register("UTC");

  const startDate = new Date(2020, 1, 15); // leap year

  const startOfYear = Date.UTC(2020, 0, 1);
  const startOfPriorYear = Date.UTC(2019, 0, 1);
  const startOfNextYear = Date.UTC(2021, 0, 1);
  const startOfTwelveYearsAgo = Date.UTC(2008, 0, 1);

  const startOfYearTicks = dt.getYearUTCTicks(startDate, 0);
  const startOfPriorYearTicks = dt.getYearUTCTicks(startDate, -1);
  const startOfNextYearTicks = dt.getYearUTCTicks(startDate, 1);
  const startOfTwelveYearsAgoTicks = dt.getYearUTCTicks(startDate, -12);

  expect(startOfYearTicks).toBe(startOfYear);
  expect(startOfPriorYearTicks).toBe(startOfPriorYear);
  expect(startOfNextYearTicks).toBe(startOfNextYear);
  expect(startOfTwelveYearsAgoTicks).toBe(startOfTwelveYearsAgo);

  tzm.unregister();
});

it("ticksToString functions work correctly", () => {
  const ticks = 1609804800000;
  const timestamp = "2021-01-05";
  const fullDate = "January 05, 2021"
  const shortDate = "05 Jan"
  const shortDateWithYear = "05 Jan 2021"

  for (let timezone of ["UTC", "US/Eastern"]) {
    tzm.register(timezone);

    expect(dt.ticksToISODateString(ticks)).toBe(timestamp);
    expect(dt.ticksToShortDate(ticks)).toBe(shortDate)
    expect(dt.ticksToShortDateWithYear(ticks)).toBe(shortDateWithYear)
    expect(dt.ticksToFullDate(ticks)).toBe(fullDate)

    tzm.unregister();
  }
});

it("stringToTicks functions work correctly", () => {
  for (let timezone of ["UTC", "US/Eastern"]) {
    tzm.register(timezone);


    expect(dt.ISODateStringToTicks("2021-01-05")).toBe(1609804800000)

    tzm.unregister();
  }
});

// TODO: Replace the formatting functions with native javascript or a smaller library
