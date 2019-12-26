import _ from "lodash";

export const sortedSummaryAmountByProperty = (items, groupBy, amount) => {
  const groupedItems = _.groupBy(items, groupBy);
  const totalPerGroup = _.mapValues(groupedItems, val => {
    return _.reduce(
      val,
      (total, item) => {
        return total + item[amount];
      },
      0
    );
  });

  const sortedTotal = _.chain(totalPerGroup)
    .keys()
    .sortBy(key => totalPerGroup[key])
    .reverse()
    .map(key => {
      return { [groupBy]: key, total: totalPerGroup[key] };
    })
    .value();

    return sortedTotal;
}