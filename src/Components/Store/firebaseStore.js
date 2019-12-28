import "firebase/firestore";
import firebase from "../Firebase/firebase";
import { getUTCTicksFromLocalDate } from "./dateUtils";

const db = firebase.firestore();
// Assuming this is safe to be a singleton for the app?
const itemsCollection = db.collection("items");
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();

const convertDateToUTC = date => {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
};

export const bulkUpdate = async () => {
  let allItemsResult = await itemsCollection.limit(50).get();
  let read = allItemsResult.docs.length;

  while (read > 0) {
    const batch = db.batch();
    let updated = 0;

    allItemsResult.docs.forEach(queryResult => {
      const doc = queryResult.data();

      if (!doc.dateTicks) {
        updated++;

        batch.update(queryResult.ref, {
          dateTicks: getUTCTicksFromLocalDate(doc.date.toDate()),
          reportingDateTicks: getUTCTicksFromLocalDate(doc.reportingDate.toDate()),
          updatedAt: serverTimestamp
        });
      }
    });

    await batch.commit();
    console.log(`Updated ${updated} of ${read} items!`);

    const lastVisible = allItemsResult.docs[read - 1];
    allItemsResult = await itemsCollection
      .startAfter(lastVisible)
      .limit(50)
      .get();
    read = allItemsResult.docs.length;
  }
};

const mapTimestampToDate = obj => {
  Object.entries(obj).forEach(([key, value]) => {
    // So - sometimes after an update updatedAt will come back null!
    // No idea why for now
    // TODO: Figure out if this is normal or we're doing something wrong
    if (typeof value === "object" && value && value.toDate) {
      obj[key] = convertDateToUTC(value.toDate());
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
  project,
  dateTicks,
  reportingDateTicks
}) => {
  // TODO: Moment-Upgrade: Remove once date/reportingDate are gone
  if (!dateTicks || !reportingDateTicks) {
    console.warn(
      "Item created with missing date/reportingDate ticks, patching..."
    );
    dateTicks = getUTCTicksFromLocalDate(date);
    reportingDateTicks = getUTCTicksFromLocalDate(reportingDate);
  }

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

  // TODO: Moment-Upgrade: Remove once date/reportingDate are gone
  if (!updatedItem.dateTicks || !updatedItem.reportingDateTicks) {
    console.warn(
      "Item updated with missing date/reportingDate ticks, patching..."
    );
    updatedItem.dateTicks = getUTCTicksFromLocalDate(updatedItem.date);
    updatedItem.reportingDateTicks = getUTCTicksFromLocalDate(
      updatedItem.reportingDate
    );
  }

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

// TODO should take a month as a parameter and find reporting date based on the month
const getTotalSpendForMonth = async month => {
  const endDate = new Date(month);
  endDate.setMonth(endDate.getMonth() + 1);

  const allItemsResult = await itemsCollection
    .where("reportingDate", ">=", month)
    .where("reportingDate", "<=", endDate)
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

const getRecent = async () => {
  // get the most recent in the past 30 days
  const thisMonth = new Date();

  thisMonth.setMonth(thisMonth.getMonth() - 2);

  const mostRecentResult = await itemsCollection
    .where("date", ">=", thisMonth)
    .get();

  const mostRecent = mostRecentResult.docs.map(d => {
    return { ...d.data(), id: d.id };
  });
  return mostRecent;
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
  getTotalSpendForMonth,
  getRecent
};
