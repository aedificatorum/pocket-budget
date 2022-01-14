import { Database } from "firebase-firestore-lite";
import Transform from "firebase-firestore-lite/dist/Transform";
import Auth from "firebase-auth-lite";
import { newId } from "./storeUtils";

const auth = new Auth({
  apiKey: "AIzaSyD9CBg8CS9XHEH5ipIJMOIIWL7wAHecctk",
});

const db = new Database({ projectId: "pocket-budget-prod", auth });
const itemsCollection = db.ref("transactions");

const getAccounts = async () => {
  const accountsResult = await db.ref("accounts").list({ pageSize: 1000 });
  const allAccounts = accountsResult.documents;
  return allAccounts;
};

const getItem = async (id) => {
  const item = await itemsCollection.child(id).get();
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
  const id = newId();
  if(typeof amount === 'string') {
    amount = parseFloat(amount);
  }

  await itemsCollection.child(id).set({
    currency,
    location,
    to,
    amount,
    details,
    project,
    dateTicks,
    reportingDateTicks,
    insertedAt: new Transform("serverTimestamp"),
    updatedAt: new Transform("serverTimestamp"),
    accountId,
  });

  return id;
};

const removeItem = async (id) => {
  await itemsCollection.child(id).delete();
};

const updateItem = async (id, updatedItem) => {
  const itemRef = itemsCollection.child(id);

  if(typeof updateItem.amount === 'string') {
    updatedItem.amount = parseFloat(updateItem.amount);
  }

  await itemRef.update({
    currency: updatedItem.currency,
    location: updatedItem.location,
    to: updatedItem.to,
    amount: updatedItem.amount,
    details: updatedItem.details,
    project: updatedItem.project,
    updatedAt: new Transform("serverTimestamp"),
    dateTicks: updatedItem.dateTicks,
    reportingDateTicks: updatedItem.reportingDateTicks,
    accountId: updatedItem.accountId,
  });
};

const getItemsForReportingPeriod = async (fromTicks, toTicks) => {
  const allItemsQuery = itemsCollection.query({
    where: [
      ["reportingDateTicks", ">=", fromTicks],
      ["reportingDateTicks", "<", toTicks],
    ],
  });

  const allItemsResult = await allItemsQuery.run();

  const allItems = allItemsResult.map((d) => {
    return { ...d, id: d.__meta__.id };
  });

  return allItems;
};

const getItemsForPeriod = async (fromTicks, toTicks) => {
  const allItemsQuery = itemsCollection.query({
    where: [
      ["dateTicks", ">=", fromTicks],
      ["dateTicks", "<", toTicks],
    ],
  });

  const allItemsResult = await allItemsQuery.run();

  const allItems = allItemsResult.map((d) => {
    return { ...d, id: d.__meta__.id };
  });

  return allItems;
};

const getItemsByAccount = async (fromTicks, toTicks, accountId) => {
  const itemsQuery = itemsCollection.query({
    where: [
      ["dateTicks", ">=", fromTicks],
      ["dateTicks", "<", toTicks],
      ["accountId", "==", accountId],
    ],
  });

  const itemsResult = await itemsQuery.run();

  const allItems = itemsResult.map((d) => {
    return { ...d, id: d.__meta__.id };
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
