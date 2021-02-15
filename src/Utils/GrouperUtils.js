import _ from "lodash";

export const groupBy = (array, property) => {
  return array.reduce((group, item) => {
    const key = item[property]

    if(key in group) {
      group[key].push(item)
    } else {
      group[key] = [item]
    }
    
    return group
  }, {})
}

export const sortedSummaryAmountByProperty = (items, groupByProperty, amount) => {
  const groupedItems = groupBy(items, groupByProperty);
  const totalPerGroup = _.mapValues(groupedItems, val => {
    return val.reduce((acc, cur) => {
      return acc + cur[amount]
    }, 0)
  });

  const sortedTotal = _.chain(totalPerGroup)
    .keys()
    .sortBy(key => totalPerGroup[key])
    .reverse()
    .map(key => {
      return { [groupByProperty]: key, total: totalPerGroup[key] };
    })
    .value();

  return sortedTotal;
};
