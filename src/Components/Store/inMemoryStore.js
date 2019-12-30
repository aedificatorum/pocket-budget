import _ from "lodash";
import moment from "moment";

let items = [];

let id = 1;

const getPendingItems = async () => {
  return items.filter(i => !i.exported);
};

const getItem = async id => {
  return items.find(i => i.id === id);
};

const addItem = ({
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
  items.push({
    id: id.toString(),
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
  return categories;
};

const getItemsForReportingPeriod = async (fromTicks, toTicks) => {
  //TODO: Make this real
  return items;
};

const subcategories = [
  {
    category: "Income",
    subcategory: "Salary",
    timesPerMonthMin: 2,
    timesPerMonthMax: 2,
    min: 1000,
    max: 1000,
    isIncome: true,
    to: "A Job"
  },
  {
    category: "Health",
    subcategory: "Yoga",
    timesPerMonthMin: 4,
    timesPerMonthMax: 6,
    min: 10,
    max: 15,
    to: "Yoga Center"
  },
  {
    category: "Health",
    subcategory: "Gym",
    timesPerMonthMin: 4,
    timesPerMonthMax: 6,
    min: 10,
    max: 15,
    to: "Super Gym"
  },
  {
    category: "Food",
    subcategory: "Groceries",
    timesPerMonthMin: 5,
    timesPerMonthMax: 12,
    min: 20,
    max: 120,
    to: "Food Shop"
  }
];

const grouped = _.groupBy(subcategories, "category");
const categories = _.flatMap(grouped, item => {
  return {
    name: item[0].category,
    subcategories: item.map(i => i.subcategory),
    isIncome: item[0].isIncome ? true : false,
  };
});

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// How many months back do we go?
// 0 = Current month only
const NUMBER_OF_MONTHS = 0;
const DEFAULT_CURRENCY = "USD";
const DEFAULT_LOCATION = "New York";
const currentMonth = moment.utc();

for(let month = NUMBER_OF_MONTHS; month >= 0; month--) {
  let targetMonth = moment.utc(currentMonth).add(-1 * month, "month");
  console.log(targetMonth.toDate())
  const daysInMonth = targetMonth.daysInMonth();

  for(let subcategoryInfo of subcategories) {
    for(let times = randomInt(subcategoryInfo.timesPerMonthMin, subcategoryInfo.timesPerMonthMax); times > 0; times--) {
      let amount = randomInt(subcategoryInfo.min * 100, subcategoryInfo.max * 100) / 100;
      if(subcategoryInfo.isIncome) {
        amount *= -1;
      }
      const dateTicks = moment.utc(targetMonth).date(randomInt(1,daysInMonth)).unix() * 1000;

      addItem({
        dateTicks,
        reportingDateTicks: dateTicks,
        currency: DEFAULT_CURRENCY,
        location: DEFAULT_LOCATION,
        category: subcategoryInfo.category,
        subcategory: subcategoryInfo.subcategory,
        to: subcategoryInfo.to,
        amount
      })
    }
  }
}

export {
  getPendingItems,
  getItem,
  addItem,
  removeItem,
  updateItem,
  setAllExported,
  getCategories,
  getSpeedyAdd,
  getItemsForReportingPeriod
};
