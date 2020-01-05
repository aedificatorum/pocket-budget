import _ from "lodash";

export const getCategoriesFromAccounts = (accounts) => {
  const grouped = _.groupBy(accounts, "category");
  const categories = _.flatMap(grouped, item => {
    return {
      name: item[0].category,
      subcategories: item.map(i => i.name),
      isIncome: item[0].isIncome ? true : false
    };
  });
  return _.sortBy(categories, 'name')
}

export const newId = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}