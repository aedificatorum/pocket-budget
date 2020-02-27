import "firebase/firestore";
import firebase from "../Firebase/firebase";
import { newId } from "./storeUtils";

const db = firebase.firestore();
const itemsCollection = db.collection("transactions");
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();

const getAccounts = async () => {
  const accountsResult = await db.collection("accounts").get();
  const allAccounts = accountsResult.docs.map(d => d.data());
  return allAccounts;
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
  to,
  amount,
  details,
  project,
  dateTicks,
  reportingDateTicks,
  accountId,
}) => {
  await itemsCollection.doc(newId()).set({
    currency,
    location,
    to,
    amount,
    details,
    project,
    dateTicks,
    reportingDateTicks,
    insertedAt: serverTimestamp,
    updatedAt: serverTimestamp,
    accountId,
  });
};

const removeItem = async id => {
  await itemsCollection.doc(id).delete();
};

const updateItem = async (id, updatedItem) => {
  const itemRef = itemsCollection.doc(id);

  await itemRef.update({
    currency: updatedItem.currency,
    location: updatedItem.location,
    to: updatedItem.to,
    amount: updatedItem.amount,
    details: updatedItem.details,
    project: updatedItem.project,
    updatedAt: serverTimestamp,
    dateTicks: updatedItem.dateTicks,
    reportingDateTicks: updatedItem.reportingDateTicks,
    accountId: updatedItem.accountId,
  });
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

const getItemsForPeriod = async (fromTicks, toTicks) => {
  const allItemsResult = await itemsCollection
    .where("dateTicks", ">=", fromTicks)
    .where("dateTicks", "<", toTicks)
    .get();

  const allItems = allItemsResult.docs.map(d => {
    return { ...d.data(), id: d.id };
  });

  return allItems;
};

const getItemsByAccount = async (fromTicks, toTicks, accountId) => {
  const allItemsResult = await itemsCollection
    .where("dateTicks", ">=", fromTicks)
    .where("dateTicks", "<", toTicks)
    .where("accountId", "==", accountId)
    .get();

  const allItems = allItemsResult.docs.map(d => {
    return { ...d.data(), id: d.id };
  });

  return allItems;
};

export {
  getItem,
  addItem,
  removeItem,
  updateItem,
  getAccounts,
  getItemsForReportingPeriod,
  getItemsForPeriod,
  getItemsByAccount,
};
