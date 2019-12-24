import {
  getPendingItems as memory_getPendingItems,
  getItem as memory_getItem,
  addItem as memory_addItem,
  removeItem as memory_removeItem,
  updateItem as memory_updateItem,
  setAllExported as memory_setAllExported,
  getCategories as memory_getCategories,
  getSpeedyAdd as memory_getSpeedyAdd,
  getTotalSpendForMonth as memory_getTotalSpendForMonth,
  getRecent as memory_getRecent
} from "./inMemoryStore";

import {
  getPendingItems as firestore_getPendingItems,
  getItem as firestore_getItem,
  addItem as firestore_addItem,
  removeItem as firestore_removeItem,
  updateItem as firestore_updateItem,
  setAllExported as firestore_setAllExported,
  getCategories as firestore_getCategories,
  getSpeedyAdd as firestore_getSpeedyAdd,
  getTotalSpendForMonth as firestore_getTotalSpendForMonth,
  getRecent as firestore_getRecent
} from "./firebaseStore";

const getPendingItems = process.env.REACT_APP_MEMORY ? memory_getPendingItems : firestore_getPendingItems;
const getItem  = process.env.REACT_APP_MEMORY ? memory_getItem : firestore_getItem;
const addItem  = process.env.REACT_APP_MEMORY ? memory_addItem : firestore_addItem;
const removeItem = process.env.REACT_APP_MEMORY ? memory_removeItem : firestore_removeItem;
const updateItem = process.env.REACT_APP_MEMORY ? memory_updateItem : firestore_updateItem;
const setAllExported = process.env.REACT_APP_MEMORY ? memory_setAllExported : firestore_setAllExported;
const getCategories = process.env.REACT_APP_MEMORY ? memory_getCategories : firestore_getCategories;
const getSpeedyAdd = process.env.REACT_APP_MEMORY ? memory_getSpeedyAdd : firestore_getSpeedyAdd;
const getTotalSpendForMonth = process.env.REACT_APP_MEMORY ? memory_getTotalSpendForMonth : firestore_getTotalSpendForMonth;
const getRecent = process.env.REACT_APP_MEMORY ? memory_getRecent : firestore_getRecent;


export {
  getPendingItems,
  getItem,
  addItem,
  removeItem,
  updateItem,
  setAllExported,
  getCategories,
  getSpeedyAdd,
  getTotalSpendForMonth,
  getRecent
};
