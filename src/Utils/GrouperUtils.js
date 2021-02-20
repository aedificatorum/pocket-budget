import { sortBy, groupBy } from "Utils/utils";

export const sortedSummaryAmountByProperty = (items, groupByProperty, sumByProperty) => {
  const groupedItems = groupBy(items, groupByProperty);

  const totalPerGroup = {};
  for (const group in groupedItems) {
    totalPerGroup[group] = groupedItems[group].reduce((total, item) => {
      return total + item[sumByProperty];
    }, 0);
  }

  const groupsSortedBySumDescending = sortBy(
    Object.keys(totalPerGroup),
    (group) => totalPerGroup[group]
  ).reverse();

  const result = groupsSortedBySumDescending.map((group) => {
    return { [groupByProperty]: group, total: totalPerGroup[group] };
  });

  return result;
};
