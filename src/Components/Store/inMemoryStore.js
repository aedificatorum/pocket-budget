import { getUTCTicksFromLocalDate } from "./dateUtils";

let items = [];
let id = 1;

const getPendingItems = async () => {
  return items.filter(i => !i.exported);
};

const getItem = async id => {
  return items.find(i => i.id === id);
};

const addItem = ({
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
  dateTicks,
  reportingDateTicks
}) => {
  // TODO: Moment-Upgrade: Remove once date/reportingDate are gone
  if(!dateTicks || !reportingDateTicks) {
    console.warn("Item created with missing date/reportingDate ticks, patching...")
    dateTicks = getUTCTicksFromLocalDate(date);
    reportingDateTicks = getUTCTicksFromLocalDate(reportingDate);
  }

  items.push({
    id: id.toString(),
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
    dateTicks,
    reportingDateTicks,
    exported: false
  });
  id++;
};

const updateItem = (id, updatedItem) => {
  const item = items.find(item => item.id === id);

  // TODO: Moment-Upgrade: Remove once date/reportingDate are gone
  if(!item.dateTicks || !item.reportingDateTicks) {
    console.warn("Item updated with missing date/reportingDate ticks, patching...")
    item.dateTicks = getUTCTicksFromLocalDate(item.date);
    item.reportingDateTicks = getUTCTicksFromLocalDate(item.reportingDate);
  }

  Object.assign(item, updatedItem);
};

const removeItem = id => {
  items = items.filter(d => d.id !== id);
};

const setAllExported = () => {
  for (let i = 0; i < items.length; i++) {
    if (!items[i].exported) {
      items[i].exported = true;
    }
  }
};

const getSpeedyAdd = () => {
  return [
    {
      id: "1",
      category: "Food",
      subcategory: "Groceries",
      to: "Key Food"
    },
    {
      id: "2",
      category: "House",
      subcategory: "Electricity",
      to: "Electricity"
    },
    { id: "3", category: "Travel", subcategory: "Taxi", to: "Uber" }
  ];
};

const getCategories = async () => {
  return [
    {
      name: "Food",
      subcategories: ["Cafe", "Restaurant"]
    },
    {
      name: "Bills",
      subcategories: ["Water", "Electricity"]
    },
    {
      name: "Travel",
      subcategories: ["Taxi", "Plane"]
    },
    {
      name: "House",
      subcategories: ["Rent"]
    },
    {
      name: "House",
      subcategories: ["Salary"]
    },
    {
      name: "Personal",
      subcategories: ["Sport", "Clothes"]
    },
    {
      name: "Miscellaneous",
      subcategories: ["-"]
    },
    {
      name: "Health",
      subcategories: ["Prescription", "Dentist"]
    }
  ];
};

const getItemsForReportingPeriod = async (fromTicks, toTicks) => {
  //TODO: Make this real
  return items;
}

const getRecent = async () => {
  return items
}

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

addItem({
  date: new Date(),
  reportingDate: new Date(),
  currency: "GBP",
  location: "London",
  category: "Personal",
  subcategory: "Clothes",
  to: "Ted Baker",
  amount: 218,
  details: "",
  project: ""
});

addItem({
  date: new Date(),
  reportingDate: new Date(),
  currency: "USD",
  location: "New York",
  category: "Travel",
  subcategory: "Taxi",
  to: "Uber",
  amount: 45,
  details: "",
  project: ""
});

addItem({
  date: new Date(),
  reportingDate: new Date(),
  currency: "EUR",
  location: "Paris",
  category: "Miscellaneous",
  subcategory: "-",
  to: "La Poste",
  amount: 2.38,
  details: "",
  project: ""
});

addItem({
  date: new Date(),
  reportingDate: new Date(),
  currency: "GBP",
  location: "Paris",
  category: "Health",
  subcategory: "Dentist",
  to: "Marvelous dentist",
  amount: 250,
  details: "",
  project: ""
});

addItem({
  date: new Date(),
  reportingDate: new Date(),
  currency: "USD",
  location: "New York",
  category: "House",
  subcategory: "Rent",
  to: "Fabulous Home",
  amount: 2000,
  details: "",
  project: ""
});

addItem({
  date: new Date(),
  reportingDate: new Date(),
  currency: "USD",
  location: "New York",
  category: "Income",
  subcategory: "Salary",
  to: "Us",
  amount: -5000,
  details: "",
  project: ""
});

addItem({
  date: new Date(),
  reportingDate: new Date(),
  currency: "USD",
  location: "New York",
  category: "Personal",
  subcategory: "Sport",
  to: "Alo Yoga",
  amount: 100,
  details: "",
  project: ""
});

items[1].exported = true;

export {
  getPendingItems,
  getItem,
  addItem,
  removeItem,
  updateItem,
  setAllExported,
  getCategories,
  getSpeedyAdd,
  getRecent,
  getItemsForReportingPeriod
};
