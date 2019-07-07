let items = [];

const getPendingItems = () => {
  return items.filter(i => !i.exported);
}

const addItem = ({date, reportingdate, currency, location, category, subcategory, to, amount, details, project}) => {
  const id = Math.random() * 500000;
  items.push({
    id, date, reportingdate, currency, location, category, subcategory, to, amount, details, project, exported: false
  });
};

const removeItem = (id) => {
  items = items.filter(d => d.id !== id);
};

const setAllExported = () => {
  items.map((item, i) => {
    if(!item.exported) {
      items[i].exported = true;
    }
  });
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


export { getPendingItems, addItem, removeItem, setAllExported };
