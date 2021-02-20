import { sortBy } from "Utils/utils";

export const getTopToFromItems = (items, topN) => {
  const sortedItems = sortBy(items, "to");

  // Add one entry for every unique to
  const uniqueTos = [];
  let lastTo = undefined;
  for (let item of sortedItems) {
    if (lastTo !== item.to) {
      uniqueTos.push(item);
      lastTo = item.to;
    }
  }

  return uniqueTos.slice(0, topN);
};
