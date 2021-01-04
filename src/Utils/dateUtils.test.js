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

  const testDate = new Date(2020, 0, 2, 23) // 11PM EST -> 4AM UTC D+1
  const incorrectMidnight = Date.UTC(2020, 0, 3)
  const correctMidnight = Date.UTC(2020, 0, 2)
  
  const midnightTicks = dt.getMidnightUTCTicks(testDate)
  // Naïve conversion to UTC - we end up with the next day
  const incorrectConvertedMidnight = Date.UTC(testDate.getUTCFullYear(), testDate.getUTCMonth(), testDate.getUTCDate())

  expect(incorrectMidnight).toBe(incorrectConvertedMidnight)
  expect(midnightTicks).toBe(correctMidnight)

  tzm.unregister();
})

// TODO: Change the API to no longer support today only, but to support passing in a 'local' date
// So today would become implemented by calling into getMidnightTicks(new Date()) - leaving all the logic to test into the getMidnightTicks
// This could also simplify all the other functions to put all the local -> UTC logic into the getMidnightTicks functions
// e.g. getStartOfMonthTicks -> takes local date, finds start of the month (local), then returns getMidnightTicks(newDate)
