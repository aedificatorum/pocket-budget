import {
  getItem as memory_getItem,
  addItem as memory_addItem,
  removeItem as memory_removeItem,
  updateItem as memory_updateItem,
  getAccounts as memory_getAccounts,
  getItemsForReportingPeriod as memory_getItemsForReportingPeriod,
  getItemsForPeriod as memory_getItemsForPeriod,
} from "./inMemoryStore";

import {
  getItem as firestore_getItem,
  addItem as firestore_addItem,
  removeItem as firestore_removeItem,
  updateItem as firestore_updateItem,
  getAccounts as firestore_getAccounts,
  getItemsForReportingPeriod as firestore_getItemsForReportingPeriod,
  getItemsForPeriod as firestore_getItemsForPeriod,
} from "./firebaseStore";

import { addCacheToFunction, addCacheToFunctionWithArgs } from "./cacheFactory";

let getItem = process.env.REACT_APP_MEMORY
  ? memory_getItem
  : firestore_getItem;
const addItem = process.env.REACT_APP_MEMORY
  ? memory_addItem
  : firestore_addItem;
const removeItem = process.env.REACT_APP_MEMORY
  ? memory_removeItem
  : firestore_removeItem;
const updateItem = process.env.REACT_APP_MEMORY
  ? memory_updateItem
  : firestore_updateItem;
const getAccounts = process.env.REACT_APP_MEMORY
  ? memory_getAccounts
  : firestore_getAccounts;
const getItemsForReportingPeriod = process.env.REACT_APP_MEMORY
  ? memory_getItemsForReportingPeriod
  : firestore_getItemsForReportingPeriod;
let getItemsForPeriod = process.env.REACT_APP_MEMORY
  ? memory_getItemsForPeriod
  : firestore_getItemsForPeriod;

let getItemsForReportingPeriodWithCache = addCacheToFunctionWithArgs(
  getItemsForReportingPeriod,
  (...args) => {
    return `GET_ITEMS_REPORTING_PERIOD_${args[0]}_${args[1]}`;
  },
  60 * 60
);
const getAccountsWithCache = addCacheToFunction(
  getAccounts,
  "QUERY_GET_ACCOUNTS",
  60 * 60
);

const addCategorySubcategoryMapping = (func) => {
  const assignMapping = (accountList, item) => {
    const account = accountList.find(acc => acc.accountId === item.accountId);
    Object.assign(item, {
      category: account.category,
      subcategory: account.name
    });
  }
  return async (...args) => {
    const accountList = await getAccountsWithCache();
    const result = await func(...args);
    if(Array.isArray(result)) {
      result.forEach(item => assignMapping(accountList, item))
    } else {
      assignMapping(accountList, result);
    }
    return result;
  };
}

getItem = addCategorySubcategoryMapping(getItem);
getItemsForReportingPeriodWithCache = addCategorySubcategoryMapping(getItemsForReportingPeriodWithCache);
getItemsForPeriod = addCategorySubcategoryMapping(getItemsForPeriod);

export {
  getItem,
  addItem,
  removeItem,
  updateItem,
  getAccountsWithCache as getAccounts,
  getItemsForReportingPeriodWithCache as getItemsForReportingPeriod,
  getItemsForPeriod,
};
