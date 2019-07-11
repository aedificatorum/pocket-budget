import firebase from "./firebase";
import "firebase/firestore";

const db = firebase.firestore();
// TODO: This should be the reference to our items collection
// Assuming this is safe to be a singleton for the app?
const whitelistRef = db.collection("whitelist-users");

const getPendingItems = async () => {
  // TOOD: Is this the best way to pull this data?
  const whitelist = await whitelistRef.get();
  const users = whitelist.docs.map(d => d.data());
  
  // TOOD: Test this fails when we put more restrictive security rules in place
  console.log(users);
  return [];
};

//TODO: All of this
const getItem = () => {};
const addItem = () => {};
const removeItem = () => {};
const updateItem = () => {};
const setAllExported = () => {};

export { getPendingItems, getItem, addItem, removeItem, updateItem, setAllExported };
