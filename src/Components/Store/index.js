import {
  getItem,
  addItem,
  removeItem,
  updateItem,
  getAccounts,
  getItemsForReportingPeriod,
  getItemsForPeriod,
  getItemsByAccount,
} from "./APP_TARGET-Store";

import { addCacheToFunction, addCacheToFunctionWithArgs } from "./cacheFactory";

let getItemsForReportingPeriodWithCache = addCacheToFunctionWithArgs(
  getItemsForReportingPeriod,
  (...args) => {
    return `GET_ITEMS_REPORTING_PERIOD_${args[0]}_${args[1]}`;
  },
  60 * 60
);
const getAccountsWithCache = addCacheToFunction(getAccounts, "QUERY_GET_ACCOUNTS", 60 * 60);
const getItemsByAccountWithCache = addCacheToFunctionWithArgs(
  getItemsByAccount,
  (...args) => {
    return `GET_ITEMS_BY_ACCOUNT_${args[0]}_${args[1]}_${args[2]}`;
  },
  60 * 60
);

const addCategorySubcategoryMapping = func => {
  const assignMapping = (accountList, item) => {
    const account = accountList.find(acc => acc.accountId === item.accountId);
    Object.assign(item, {
      category: account.category,
      subcategory: account.name,
    });
  };
  return async (...args) => {
    const accountList = await getAccountsWithCache();
    const result = await func(...args);
    if (Array.isArray(result)) {
      result.forEach(item => assignMapping(accountList, item));
    } else {
      assignMapping(accountList, result);
    }
    return result;
  };
};

const getItemWithCats = addCategorySubcategoryMapping(getItem);
getItemsForReportingPeriodWithCache = addCategorySubcategoryMapping(
  getItemsForReportingPeriodWithCache
);
const getItemsForPeriodWithCats = addCategorySubcategoryMapping(getItemsForPeriod);

export {
  getItemWithCats as getItem,
  addItem,
  removeItem,
  updateItem,
  getAccountsWithCache as getAccounts,
  getItemsForReportingPeriodWithCache as getItemsForReportingPeriod,
  getItemsForPeriodWithCats as getItemsForPeriod,
  getItemsByAccountWithCache as getItemsByAccount,
};
