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
const getItem = (id) => {};
const addItem = ({date, reportingdate, currency, location, category, subcategory, to, amount, details, project}) => {};
const removeItem = (id) => {};
const updateItem = (id, updatedItem) => {};
const setAllExported = () => {};

export { getPendingItems, getItem, addItem, removeItem, updateItem, setAllExported };
