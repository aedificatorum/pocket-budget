import firebase from "./firebase";
import "firebase/firestore";

const db = firebase.firestore();
// Assuming this is safe to be a singleton for the app?
const itemsRef = db.collection("items");

const getPendingItems = async () => {
  // TOOD: Is this the best way to pull this data?
  const allItemsResult = await itemsRef.get();
  const allItems = allItemsResult.docs.map(d => d.data());
  // TODO: where !exported
  
  // TODO: This is rubbish?
  for(let i = 0; i < allItems.length; i++) {
    allItems[i].date = allItems[i].date.toDate();
    allItems[i].reportingdate = allItems[i].reportingdate.toDate();
  }

  // TOOD: Test this fails when we put more restrictive security rules in place
  console.log(allItems);
  return allItems;
};

//TODO: All of this
const getItem = () => {};
const addItem = () => {};
const removeItem = () => {};
const updateItem = () => {};
const setAllExported = () => {};

export { getPendingItems, getItem, addItem, removeItem, updateItem, setAllExported };
