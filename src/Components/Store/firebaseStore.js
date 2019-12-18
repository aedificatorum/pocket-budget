import firebase from "../Firebase/firebase";
import "firebase/firestore";

const db = firebase.firestore();
// Assuming this is safe to be a singleton for the app?
const itemsCollection = db.collection("items");
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();

const mapTimestampToDate = obj => {
  Object.entries(obj).forEach(([key, value]) => {
    // So - sometimes after an update updatedAt will come back null!
    // No idea why for now
    // TODO: Figure out if this is normal or we're doing something wrong
    if (typeof value === "object" && value && value.toDate) {
      obj[key] = value.toDate();
    }
  });
};

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

  // TODO: This is rubbish?
  for (let i = 0; i < allItems.length; i++) {
    mapTimestampToDate(allItems[i]);
  }

  return allItems;
};

const getItem = async id => {
  const itemRef = await itemsCollection.doc(id).get();
  const item = itemRef.data();
  mapTimestampToDate(item);
  item.id = id;
  return item;
};

const addItem = async ({
  date,
  reportingDate,
  currency,
  location,
  category,
  subcategory,
  to,
  amount,
  details,
  project
}) => {
  await itemsCollection.add({
    date,
    reportingDate,
    currency,
    location,
    category,
    subcategory,
    to,
    amount,
    details,
    project,
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
    updatedAt: serverTimestamp
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

// TODO should take a month as a parameter and find reporting date based on the month
const getTotalSpendThisMonth = async () => {
  let startDate = new Date('2019-10-01')
  let endDate = new Date('2019-11-01')
  const allItemsResult = await itemsCollection
  .where("reportingDate", ">=", startDate)
  .where("reportingDate", "<=", endDate)
  .get();

  const allItems = allItemsResult.docs.map(d => {
    return { ...d.data(), id: d.id };
  })

  // TODO: This is rubbish?
  for (let i = 0; i < allItems.length; i++) {
    mapTimestampToDate(allItems[i]);
  }

  return allItems
}

export {
  getPendingItems,
  getItem,
  addItem,
  removeItem,
  updateItem,
  setAllExported,
  getCategories,
  getSpeedyAdd,
  getTotalSpendThisMonth
};
