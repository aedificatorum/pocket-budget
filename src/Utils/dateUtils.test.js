import * as dt from "./dateUtils"

it('getTodayTicks returns UTC midnight of the current local date', () => {
  // TODO: this
  expect(dt.getTodayTicks()).toBe(1000)
});