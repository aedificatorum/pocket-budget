import { getTopToFromItems } from "./utils"

const itemsNoDuplicates = [
  {to: "A"},
  {to: "B"},
  {to: "C"},
  {to: "D"},
  {to: "E"},
  {to: "F"},

]

it("getTopToFromItems returns the first 5 items from a list of 6", () => {
  const topFive = getTopToFromItems(itemsNoDuplicates, 5);

  expect(topFive.length).toBe(5);
  expect(topFive[4].to).toBe("E");
});