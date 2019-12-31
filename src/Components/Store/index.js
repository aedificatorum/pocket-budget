import {
  getPendingItems as memory_getPendingItems,
  getItem as memory_getItem,
  addItem as memory_addItem,
  removeItem as memory_removeItem,
  updateItem as memory_updateItem,
  setAllExported as memory_setAllExported,
  getCategories as memory_getCategories,
  getAccounts as memory_getAccounts,
  getSpeedyAdd as memory_getSpeedyAdd,
  getItemsForReportingPeriod as memory_getItemsForReportingPeriod
} from "./inMemoryStore";

import {
  getPendingItems as firestore_getPendingItems,
  getItem as firestore_getItem,
  addItem as firestore_addItem,
  removeItem as firestore_removeItem,
  updateItem as firestore_updateItem,
  setAllExported as firestore_setAllExported,
  getCategories as firestore_getCategories,
  getAccounts as firestore_getAccounts,
  getSpeedyAdd as firestore_getSpeedyAdd,
  getItemsForReportingPeriod as firestore_getItemsForReportingPeriod
} from "./firebaseStore";

import { addCacheToFunction, addCacheToFunctionWithArgs } from "./cacheFactory";

const getPendingItems = process.env.REACT_APP_MEMORY
  ? memory_getPendingItems
  : firestore_getPendingItems;
const getItem = process.env.REACT_APP_MEMORY
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
const setAllExported = process.env.REACT_APP_MEMORY
  ? memory_setAllExported
  : firestore_setAllExported;
const getCategories = process.env.REACT_APP_MEMORY
  ? memory_getCategories
  : firestore_getCategories;
const getAccounts = process.env.REACT_APP_MEMORY
  ? memory_getAccounts
  : firestore_getAccounts;
const getSpeedyAdd = process.env.REACT_APP_MEMORY
  ? memory_getSpeedyAdd
  : firestore_getSpeedyAdd;
const getItemsForReportingPeriod = process.env.REACT_APP_MEMORY
  ? memory_getItemsForReportingPeriod
  : firestore_getItemsForReportingPeriod;

const getSpeedyAddWithCache = addCacheToFunction(
  getSpeedyAdd,
  "QUERY_GET_SPEEDY_ADD",
  60 * 60 * 24
);
const getItemsForReportingPeriodWithCache = addCacheToFunctionWithArgs(
  getItemsForReportingPeriod,
  (...args) => {
    return `GET_ITEMS_REPORTING_PERIOD_${args[0]}_${args[1]}`;
  },
  60 * 60
);

export {
  getPendingItems,
  getItem,
  addItem,
  removeItem,
  updateItem,
  setAllExported,
  getCategories,
  getAccounts,
  getSpeedyAddWithCache as getSpeedyAdd,
  getItemsForReportingPeriodWithCache as getItemsForReportingPeriod
};
