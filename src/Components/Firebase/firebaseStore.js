import firebase from "./firebase";
import "firebase/firestore";

const db = firebase.firestore();
// Assuming this is safe to be a singleton for the app?
const itemsCollection = db.collection("items");
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();

const mapTimestampToDate = (obj) => {
  Object.entries(obj).forEach(([key, value]) => {
    if(typeof value === 'object' && value.toDate) {
      obj[key] = value.toDate();
    }
  });
}

const getPendingItems = async () => {
  // TOOD: Is this the best way to pull this data?
  const allItemsResult = await itemsCollection.get();
  const allItems = allItemsResult.docs.map(d => {
    return {...d.data(), id: d.id }
  });
  // TODO: where !exported
  
  // TODO: This is rubbish?
  for(let i = 0; i < allItems.length; i++) {
    mapTimestampToDate(allItems[i]);
  }

  console.log(allItems);
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

// TODO: implement removeItem
const removeItem = (id) => {};

// TOOD: implement updateItem
const updateItem = (id, updatedItem) => {};

// TODO: implement setAllExported
const setAllExported = () => {};

export { getPendingItems, getItem, addItem, removeItem, updateItem, setAllExported };
