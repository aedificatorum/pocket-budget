let items = [];
let id = 1;

const getPendingItems = () => {
  return items.filter(i => !i.exported);
}

const getItem = (id) => {
  return items.find(i => i.id === parseInt(id));
}

const addItem = ({date, reportingdate, currency, location, category, subcategory, to, amount, details, project}) => {
  items.push({
    id, date, reportingdate, currency, location, category, subcategory, to, amount, details, project, exported: false
  });
  id++;
};

const updateItem = (id, updatedItem) => {
  const item = items.find(item =>  item.id === parseInt(id));
  Object.assign(item, updatedItem);
};

const removeItem = (id) => {
  items = items.filter(d => d.id !== id);
};

const setAllExported = () => {
  for(let i = 0; i < items.length; i++) {
    if(!items[i].exported) {
      items[i].exported = true;
    }
  }
};

// Seed the store with a few fake items
const todayAsDefault = new Date().toISOString().substr(0, 10);

addItem({
  date: todayAsDefault,
  reportingdate: todayAsDefault,
  currency: "USD",
  location: "New York",
  category: "Food",
  subcategory: "Cafe",
  to: "Starbucks",
  amount: 9.99,
  details: "",
  project: ""
});

addItem({
  date: todayAsDefault,
  reportingdate: todayAsDefault,
  currency: "USD",
  location: "New York",
  category: "Food",
  subcategory: "Restaurant",
  to: "Chiptole",
  amount: 12.49,
  details: "",
  project: ""
});

items[1].exported = true;


export { getPendingItems, getItem, addItem, removeItem, updateItem, setAllExported };
