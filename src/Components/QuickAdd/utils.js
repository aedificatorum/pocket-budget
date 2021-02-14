import _ from "lodash";

export const getTopToFromItems = (items, topN) => {
  return _.chain(items).uniqBy("to").sortBy("to").take(topN).value();
};

export const sortBy = (array) => {
  return _.sortBy(array)
}