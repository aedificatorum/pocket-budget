import { sortBy } from "./utils";

it("sortBy sorts items in alphanumeric order", () => {
  const list = ["D", "C", "B", "A"];

  const sortedList = sortBy(list);
  expect(sortedList[0]).toBe("A");
  expect(sortedList[1]).toBe("B");
  expect(sortedList[2]).toBe("C");
  expect(sortedList[3]).toBe("D");
});

it("sortBy works with a comparison func that overrides A to Z", () => {
  const list = ["D", "C", "B", "A"];
  const comparisonFunc = (item) => (item === "A" ? "Z" : item);

  const sortedList = sortBy(list, comparisonFunc);

  expect(sortedList[0]).toBe("B");
  expect(sortedList[1]).toBe("C");
  expect(sortedList[2]).toBe("D");
  expect(sortedList[3]).toBe("A");
});

it("sortBy works with a prop sort", () => {
  const list = [{ to: "B" }, { to: "C" }, { to: "D" }, { to: "A" }];

  const sortedList = sortBy(list, "to");

  expect(sortedList[0].to).toBe("A");
  expect(sortedList[1].to).toBe("B");
  expect(sortedList[2].to).toBe("C");
  expect(sortedList[3].to).toBe("D");
});
