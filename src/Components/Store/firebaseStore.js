import "firebase/firestore";
import firebase from "../Firebase/firebase";
import { getCategoriesFromAccounts } from "./storeUtils";

const db = firebase.firestore();
// Assuming this is safe to be a singleton for the app?
const itemsCollection = db.collection("items");
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();

const getAccounts = async () => {
  const accountsResult = await db.collection("accounts").get();
  const allAccounts = accountsResult.docs.map(d => d.data());
  return allAccounts;
};

const getCategories = async () => {
  const accounts = await getAccounts();
  return getCategoriesFromAccounts(accounts);
};

const getSpeedyAdd = async () => {
  const speedyAddResult = await db.collection("speedy-add").get();
  const speedyAdd = speedyAddResult.docs.map(d => {
    return { ...d.data(), id: d.id };
  });
  return speedyAdd;
};

const getPendingItems = async () => {
  // TOOD: Is this the best way to pull this data?
  const allItemsResult = await itemsCollection
    .where("exported", "==", false)
    .get();
  const allItems = allItemsResult.docs.map(d => {
    return { ...d.data(), id: d.id };
  });

  return allItems;
};

const getItem = async id => {
  const itemRef = await itemsCollection.doc(id).get();
  const item = itemRef.data();
  item.id = id;
  return item;
};

const addItem = async ({
  currency,
  location,
  category,
  subcategory,
  to,
  amount,
  details,
  project,
  dateTicks,
  reportingDateTicks,
  accountId
}) => {
  // TODO: Remove this when cat/subcat no longer passed in
  if(!accountId) {
    const accounts = await getAccounts();
    accountId = accounts.find(account => {
      return account.name === subcategory && account.category === category
    });
  }

  await itemsCollection.add({
    currency,
    location,
    category,
    subcategory,
    to,
    amount,
    details,
    project,
    dateTicks,
    reportingDateTicks,
    exported: false,
    insertedAt: serverTimestamp,
    updatedAt: serverTimestamp,
    accountId
  });
};

const removeItem = async id => {
  await itemsCollection.doc(id).delete();
};

const updateItem = async (id, updatedItem) => {
  const itemRef = itemsCollection.doc(id);

  // TODO: Remove this when cat/subcat no longer passed in
  if(!updatedItem.accountId) {
    const accounts = await getAccounts();
    updatedItem.accountId = accounts.find(account => {
      return account.name === updatedItem.subcategory && account.category === updatedItem.category
    });
  }

  await itemRef.update({
    currency: updatedItem.currency,
    location: updatedItem.location,
    category: updatedItem.category,
    subcategory: updatedItem.subcategory,
    to: updatedItem.to,
    amount: updatedItem.amount,
    details: updatedItem.details,
    project: updatedItem.project,
    updatedAt: serverTimestamp,
    dateTicks: updatedItem.dateTicks,
    reportingDateTicks: updatedItem.reportingDateTicks,
    accountId: updatedItem.accountId
  });
};

const setAllExported = async () => {
  const allItemsResult = await itemsCollection
    .where("exported", "==", false)
    .get();
  const batch = db.batch();

  allItemsResult.docs.forEach(queryResult => {
    batch.update(queryResult.ref, {
      exported: true,
      updatedAt: serverTimestamp
    });
  });

  await batch.commit();
};

const getItemsForReportingPeriod = async (fromTicks, toTicks) => {
  const allItemsResult = await itemsCollection
    .where("reportingDateTicks", ">=", fromTicks)
    .where("reportingDateTicks", "<", toTicks)
    .get();

  const allItems = allItemsResult.docs.map(d => {
    return { ...d.data(), id: d.id };
  });

  return allItems;
};

export {
  getPendingItems,
  getItem,
  addItem,
  removeItem,
  updateItem,
  setAllExported,
  getCategories,
  getSpeedyAdd,
  getItemsForReportingPeriod
};
