import moment from "moment";

let items = [];
let nextAccountId = 1;
let nextItemId = 1;

const getItem = async id => {
  return items.find(i => i.id === parseInt(id));
};

const addItem = ({
  currency,
  location,
  to,
  amount,
  details,
  project,
  dateTicks,
  reportingDateTicks,
  accountId
}) => {
  items.push({
    id: nextItemId++,
    currency,
    location,
    to,
    amount,
    details,
    project,
    dateTicks,
    reportingDateTicks,
    accountId
  });
};

const updateItem = (id, updatedItem) => {
  const item = items.find(item => item.id === parseInt(id));

  Object.assign(item, updatedItem);
};

const removeItem = id => {
  items = items.filter(d => d.id !== parseInt(id));
};

const getItemsForReportingPeriod = async (fromTicks, toTicks) => {
  return items.filter(item => {
    return (
      item.reportingDateTicks >= fromTicks && item.reportingDateTicks < toTicks
    );
  });
};

const getItemsForPeriod = async (fromTicks, toTicks) => {
  return items.filter(item => {
    return item.dateTicks >= fromTicks && item.dateTicks < toTicks;
  });
};

const subcategories = [
  {
    category: "Income",
    subcategory: "Salary",
    timesPerMonthMin: 2,
    timesPerMonthMax: 2,
    min: 2500,
    max: 2500,
    isIncome: true,
    to: "A Job"
  },
  {
    category: "Income",
    subcategory: "Marketplace",
    timesPerMonthMin: -5,
    timesPerMonthMax: 3,
    min: 30,
    max: 100,
    isIncome: true,
    to: "eBay"
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
  },
  {
    category: "Personal",
    subcategory: "Clothes",
    timesPerMonthMin: 1,
    timesPerMonthMax: 2,
    min: 50,
    max: 250,
    to: "Cool Clothes"
  },
  {
    category: "Travel",
    subcategory: "Plane",
    timesPerMonthMin: 0,
    timesPerMonthMax: 1,
    min: 150,
    max: 600,
    to: "Flyway Airlines"
  },
  {
    category: "Travel",
    subcategory: "Hotel",
    timesPerMonthMin: 0,
    timesPerMonthMax: 1,
    min: 75,
    max: 400,
    to: "Questionable Accomodation"
  },
  {
    category: "Entertainment",
    subcategory: "Events",
    timesPerMonthMin: 2,
    timesPerMonthMax: 5,
    min: 15,
    max: 70,
    to: "Super Shows"
  },
  {
    category: "Entertainment",
    subcategory: "Restaurant",
    timesPerMonthMin: 5,
    timesPerMonthMax: 12,
    min: 10,
    max: 120,
    to: "Variable Rate Eats"
  },
  {
    category: "House",
    subcategory: "Rent",
    timesPerMonthMin: 1,
    timesPerMonthMax: 1,
    min: 1500,
    max: 1500,
    to: "House & Home"
  },
  {
    category: "Property",
    subcategory: "Rent",
    timesPerMonthMin: 1,
    timesPerMonthMax: 1,
    min: 900,
    max: 900,
    to: "Property Company",
    currency: "CAD",
    isIncome: true
  },
  {
    category: "Property",
    subcategory: "Mortgage",
    timesPerMonthMin: 1,
    timesPerMonthMax: 1,
    min: 700,
    max: 700,
    to: "Bank of Canada",
    currency: "CAD"
  }
];

const accounts = subcategories.map(subcat => {
  return {
    accountId: nextAccountId++,
    name: subcat.subcategory,
    isIncome: subcat.isIncome ? true : false,
    category: subcat.category
  };
});

const getAccounts = () => {
  return accounts;
};

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getItemsByAccount =  async (fromTicks, toTicks, accountId) => {
  const items = await getItemsForPeriod(fromTicks, toTicks);
  return items.filter(item => item.accountId === accountId);
}

// How many months back do we go?
// 0 = Current month only
const NUMBER_OF_MONTHS = 6;
const DEFAULT_CURRENCY = "USD";
const DEFAULT_LOCATION = "New York";
const currentMonth = moment.utc();

for (let month = NUMBER_OF_MONTHS; month >= 0; month--) {
  let targetMonth = moment.utc(currentMonth).add(-1 * month, "month");
  const daysInMonth = targetMonth.daysInMonth();

  for (let subcategoryInfo of subcategories) {
    for (
      let times = randomInt(
        subcategoryInfo.timesPerMonthMin,
        subcategoryInfo.timesPerMonthMax
      );
      times > 0;
      times--
    ) {
      let amount =
        randomInt(subcategoryInfo.min * 100, subcategoryInfo.max * 100) / 100;

      const dateTicks =
        moment
          .utc(targetMonth)
          .date(randomInt(1, daysInMonth))
          .unix() * 1000;
      const accountId = accounts.find(
        account =>
          account.name === subcategoryInfo.subcategory &&
          account.category === subcategoryInfo.category
      ).accountId;
      addItem({
        dateTicks,
        reportingDateTicks: dateTicks,
        currency: subcategoryInfo.currency || DEFAULT_CURRENCY,
        location: DEFAULT_LOCATION,
        accountId,
        to: subcategoryInfo.to,
        amount
      });
    }
  }
}

export {
  getItem,
  addItem,
  removeItem,
  updateItem,
  getAccounts,
  getItemsForReportingPeriod,
  getItemsForPeriod,
  getItemsByAccount
};
