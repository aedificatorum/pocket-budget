import { sortBy } from "./utils";

it("sortBy sorts items in alphanumeric order", () => {
  const list = ["D", "C", "B", "A"];

  const sortedList = sortBy(list);
  expect(sortedList[0]).toBe("A");
  expect(sortedList[1]).toBe("B");
  expect(sortedList[2]).toBe("C");
  expect(sortedList[3]).toBe("D");
});
