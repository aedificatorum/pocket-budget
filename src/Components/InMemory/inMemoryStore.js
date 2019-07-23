let items = [];
let id = 1;

const getPendingItems = async () => {
  return items.filter(i => !i.exported);
}

const getItem = async (id) => {
  return items.find(i => i.id === parseInt(id));
}

const addItem = ({date, reportingDate, currency, location, category, subcategory, to, amount, details, project}) => {
  items.push({
    id, date, reportingDate, currency, location, category, subcategory, to, amount, details, project, exported: false
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

const getCategories = async () => {
  return [
    {
      name: "Food",
      subcategories: ["Eating Out", "Restaurant"]
    },
    {
      name: "Bills",
      subcategories: ["Water", "Electricity"]
    }
  ];
};

// Seed the store with a few fake items

addItem({
  date: new Date(),
  reportingDate: new Date(),
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
  date: new Date(),
  reportingDate: new Date(),
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


export { getPendingItems, getItem, addItem, removeItem, updateItem, setAllExported, getCategories };
