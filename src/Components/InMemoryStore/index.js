let items = [];

const getPendingItems = () => {
  return items.slice();
}

const addItem = ({date, reportingdate, currency, location, category, subcategory, to, amount, details, project}) => {
  const id = Math.random() * 500000;
  items.push({
    id, date, reportingdate, currency, location, category, subcategory, to, amount, details, project
  });
  console.log(items)
};

const removeItem = (id) => {
  items = items.filter(d => d.id !== id);
};

const setAllExported = () => {
  items = [];
};

// Seed the store with a fake item
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

export { getPendingItems, addItem, removeItem, setAllExported };
