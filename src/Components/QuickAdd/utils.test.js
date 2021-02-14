import { getTopToFromItems, sortBy } from "./utils";

const itemsNoDuplicates = [
  { to: "A" },
  { to: "B" },
  { to: "C" },
  { to: "D" },
  { to: "E" },
  { to: "F" },
];

const itemsDuplicates = [...itemsNoDuplicates, ...itemsNoDuplicates];

const itemsReverseOrder = [...itemsNoDuplicates].reverse();

it("getTopToFromItems returns the first 5 items from a unique list of 6", () => {
  const topFive = getTopToFromItems(itemsNoDuplicates, 5);

  expect(topFive.length).toBe(5);
  expect(topFive[4].to).toBe("E");
});

it("getTopToFromItems returns the first 5 items from a list of 6 duplicated items", () => {
  const topFive = getTopToFromItems(itemsDuplicates, 5);

  expect(topFive.length).toBe(5);
  expect(topFive[4].to).toBe("E");
});

it("getTopToFromItems returns all 6 items from a unique array in alphanumeric order", () => {
  const topFive = getTopToFromItems(itemsReverseOrder, 6);

  expect(topFive.length).toBe(6);
  expect(topFive[0].to).toBe("A");
  expect(topFive[5].to).toBe("F");
});

it("sortBy sorts items in alphanumeric order", () => {
  const list = ["D", "C", "B", "A"];

  const sortedList = sortBy(list);
  expect(sortedList[0]).toBe("A");
  expect(sortedList[1]).toBe("B");
  expect(sortedList[2]).toBe("C");
  expect(sortedList[3]).toBe("D");
});
