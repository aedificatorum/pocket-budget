import * as tzm from "timezone-mock"
import * as dt from "./dateUtils"

/*
- All dates stored as UTC midnight

- User is in France, it's 00:30 local time (UTC+1) on the 1st Jan
- This is 23:30 the _day before_ in UTC (31st Dec)
- We want to persist this date as the 31st December (UTC) - NOT 1st Jan

*/

it('timezone mocking works as expected', () => {
  tzm.register("US/Eastern")

  let d = new Date("2020-12-31T23:00:00.000-05:00");
  expect(d.getTimezoneOffset()).toBe(300) // -5 hours from UTC
  expect(d.getHours()).toBe(23) // 11pm local time
  expect(d.getUTCHours()).toBe(4) // 4am UTC time...
  expect(d.getDate()).toBe(31) // ...the next day
  expect(d.getUTCDate()).toBe(1)

  tzm.unregister()
});

it('getTodayTicks works in the UTC timezone', () => {
  tzm.register("UTC")

  const todayTicks = dt.getTodayTicks()

  const today = new Date();
  today.setHours(0)
  today.setMinutes(0)
  today.setSeconds(0)
  today.setMilliseconds(0)

  const computedTicks = today.getTime()

  expect(todayTicks).toBe(computedTicks)

  tzm.unregister()
})