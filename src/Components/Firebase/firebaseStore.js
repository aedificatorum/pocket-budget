import firebase from "./firebase";
import "firebase/firestore";

const db = firebase.firestore();
// Assuming this is safe to be a singleton for the app?
const itemsCollection = db.collection("items");
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

const getPendingItems = async () => {
  // TOOD: Is this the best way to pull this data?
  const allItemsResult = await itemsCollection.get();
  const allItems = allItemsResult.docs.map(d => d.data());
  // TODO: where !exported
  
  // TODO: This is rubbish?
  for(let i = 0; i < allItems.length; i++) {
    allItems[i].date = allItems[i].date.toDate();
    allItems[i].reportingDate = allItems[i].reportingDate.toDate();
  }

  return allItems;
};

//TODO: implement getItem
const getItem = (id) => {};

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

// TODO: implement removeItem
const removeItem = (id) => {};

// TOOD: implement updateItem
const updateItem = (id, updatedItem) => {};

// TODO: implement setAllExported
const setAllExported = () => {};

export { getPendingItems, getItem, addItem, removeItem, updateItem, setAllExported };
