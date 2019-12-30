import "firebase/firestore";
import firebase from "../Firebase/firebase";

const db = firebase.firestore();
// Assuming this is safe to be a singleton for the app?
const itemsCollection = db.collection("items");
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();

const getCategories = async () => {
  const allCategoriesResult = await db.collection("categories").get();
  const allCategories = allCategoriesResult.docs.map(d => d.data());
  return allCategories;
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
  reportingDateTicks
}) => {
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
    updatedAt: serverTimestamp
  });
};

const removeItem = async id => {
  await itemsCollection.doc(id).delete();
};

const updateItem = async (id, updatedItem) => {
  const itemRef = itemsCollection.doc(id);

  await itemRef.update({
    date: updatedItem.date,
    reportingDate: updatedItem.reportingDate,
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
    reportingDateTicks: updatedItem.reportingDateTicks
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
