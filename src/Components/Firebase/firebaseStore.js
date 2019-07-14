import firebase from "./firebase";
import "firebase/firestore";

const db = firebase.firestore();
// Assuming this is safe to be a singleton for the app?
const itemsCollection = db.collection("items");
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();

const mapTimestampToDate = (obj) => {
  Object.entries(obj).forEach(([key, value]) => {
    // So - sometimes after an update updatedAt will come back null!
    // No idea why for now
    // TODO: Figure out if this is normal or we're doing something wrong
    if(typeof value === 'object' && value && value.toDate) {
      obj[key] = value.toDate();
    }
  });
}

const getPendingItems = async () => {
  // TOOD: Is this the best way to pull this data?
  const allItemsResult = await itemsCollection.where("exported", "==", false).get();
  const allItems = allItemsResult.docs.map(d => {
    return {...d.data(), id: d.id }
  });

  // TODO: This is rubbish?
  for(let i = 0; i < allItems.length; i++) {
    mapTimestampToDate(allItems[i]);
  }

  return allItems;
};

//TODO: implement getItem
const getItem = async (id) => {
  const itemRef = await itemsCollection.doc(id).get();
  const item = itemRef.data();
  mapTimestampToDate(item);
  item.id = id;
  return item;
};

const addItem = ({date, reportingDate, currency, location, category, subcategory, to, amount, details, project}) => {
  itemsCollection.add({
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
    }
  )
};

const removeItem = async (id) => {
  await itemsCollection.doc(id).delete();
};

const updateItem = (id, updatedItem) => {
  const itemRef = itemsCollection.doc(id);
  itemRef.set({
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
  }, { merge: true }); // otherwise it wipes out exist properties
};

// TODO: implement setAllExported
const setAllExported = () => {};

export { getPendingItems, getItem, addItem, removeItem, updateItem, setAllExported };
