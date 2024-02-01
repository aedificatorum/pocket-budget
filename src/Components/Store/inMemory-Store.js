let items = [];
let nextAccountId = 1;
let nextItemId = 1;

const getItem = async (id) => {
  return items.find((i) => i.id === parseInt(id));
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
  accountId,
}) => {
  const id = nextItemId++;
  if(typeof amount === 'string') {
    amount = parseFloat(amount);
  }

  items.push({
    id,
    currency,
    location,
    to,
    amount,
    details,
    project,
    dateTicks,
    reportingDateTicks,
    accountId,
  });

  return id;
};

const updateItem = (id, updatedItem) => {
  const item = items.find((item) => item.id === parseInt(id));

  if(typeof updateItem.amount === 'string') {
    updatedItem.amount = parseFloat(updateItem.amount);
  }

  Object.assign(item, updatedItem);
};

const removeItem = (id) => {
  items = items.filter((d) => d.id !== parseInt(id));
};

const getItemsForReportingPeriod = async (fromTicks, toTicks) => {
  return items.filter((item) => {
    return item.reportingDateTicks >= fromTicks && item.reportingDateTicks < toTicks;
  });
};

const getItemsForPeriod = async (fromTicks, toTicks) => {
  return items.filter((item) => {
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
    to: "Amazing job",
  },
  {
    category: "Income",
    subcategory: "Marketplace",
    timesPerMonthMin: -5,
    timesPerMonthMax: 3,
    min: 30,
    max: 100,
    isIncome: true,
    to: "eBay",
  },
  {
    category: "Health",
    subcategory: "Yoga",
    timesPerMonthMin: 2,
    timesPerMonthMax: 10,
    min: 10,
    max: 15,
    to: "Om Master",
  },
  {
    category: "Health",
    subcategory: "Gym",
    timesPerMonthMin: 2,
    timesPerMonthMax: 5,
    min: 10,
    max: 15,
    to: "Sweat Money",
  },
  {
    category: "Health",
    subcategory: "Medication",
    timesPerMonthMin: 1,
    timesPerMonthMax: 1,
    min: 50,
    max: 55,
    to: "Heal You",
  },
  {
    category: "Food",
    subcategory: "Groceries",
    timesPerMonthMin: 5,
    timesPerMonthMax: 12,
    min: 20,
    max: 120,
    to: "Food Shop",
  },
  {
    category: "Food",
    subcategory: "Gourmet",
    timesPerMonthMin: 1,
    timesPerMonthMax: 2,
    min: 15,
    max: 80,
    to: "Chocolicious Chocolate",
  },
  {
    category: "Personal",
    subcategory: "Shoes",
    timesPerMonthMin: -2,
    timesPerMonthMax: 2,
    min: 50,
    max: 150,
    to: "Timberterra",
  },
  {
    category: "Personal",
    subcategory: "Accessories",
    timesPerMonthMin: -2,
    timesPerMonthMax: 2,
    min: 350,
    max: 500,
    to: "LongPré",
  },
  {
    category: "Personal",
    subcategory: "Clothes",
    timesPerMonthMin: -1,
    timesPerMonthMax: 1,
    min: 70,
    max: 400,
    to: "North Feet",
  },
  {
    category: "Vacation",
    subcategory: "Plane",
    timesPerMonthMin: 0,
    timesPerMonthMax: 1,
    min: 150,
    max: 600,
    to: "Flyway Airlines",
  },
  {
    category: "Vacation",
    subcategory: "Hotel",
    timesPerMonthMin: 0,
    timesPerMonthMax: 1,
    min: 75,
    max: 400,
    to: "Questionable Accomodation",
  },
  {
    category: "Entertainment",
    subcategory: "Events",
    timesPerMonthMin: 2,
    timesPerMonthMax: 5,
    min: 15,
    max: 70,
    to: "Super Shows",
  },
  {
    category: "Entertainment",
    subcategory: "Hobbies",
    timesPerMonthMin: 1,
    timesPerMonthMax: 2,
    min: 10,
    max: 300,
    to: "EntertainMe.com",
  },
  {
    category: "Entertainment",
    subcategory: "Restaurant",
    timesPerMonthMin: 1,
    timesPerMonthMax: 5,
    min: 3,
    max: 12,
    to: "StarBeurk",
  },
  {
    category: "Housing",
    subcategory: "Rent",
    timesPerMonthMin: 1,
    timesPerMonthMax: 1,
    min: 1500,
    max: 1500,
    to: "House & Home",
  },
  {
    category: "Housing",
    subcategory: "Furnishing",
    timesPerMonthMin: -2,
    timesPerMonthMax: 2,
    min: 100,
    max: 1500,
    to: "Beauti Design",
  },
  {
    category: "Housing",
    subcategory: "Consumables",
    timesPerMonthMin: 1,
    timesPerMonthMax: 1,
    min: 100,
    max: 200,
    to: "Eco Shine",
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
    isIncome: true,
  },
  {
    category: "Property",
    subcategory: "Mortgage",
    timesPerMonthMin: 1,
    timesPerMonthMax: 1,
    min: 700,
    max: 700,
    to: "Bank of Canada",
    currency: "CAD",
  },
];

const accounts = subcategories.map((subcat) => {
  return {
    accountId: (nextAccountId++).toString(),
    name: subcat.subcategory,
    isIncome: subcat.isIncome ? true : false,
    category: subcat.category,
  };
});

const getAccounts = () => {
  return accounts;
};

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getItemsByAccount = async (fromTicks, toTicks, accountId) => {
  const items = await getItemsForPeriod(fromTicks, toTicks);
  return items.filter((item) => item.accountId === accountId);
};

// How many months back do we go?
// 0 = Current month only
const NUMBER_OF_MONTHS = 6;
const DEFAULT_CURRENCY = "GBP";
const DEFAULT_LOCATION = "London";
const localDate = new Date();
const startOfMonth = new Date(localDate.getFullYear(), localDate.getMonth(), 1);

for (let month = NUMBER_OF_MONTHS; month >= 0; month--) {
  let targetMonth = new Date(startOfMonth);
  targetMonth.setMonth(localDate.getMonth() - month);

  const daysInMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), 0).getDate();

  for (let subcategoryInfo of subcategories) {
    for (
      let times = randomInt(subcategoryInfo.timesPerMonthMin, subcategoryInfo.timesPerMonthMax);
      times > 0;
      times--
    ) {
      let amount = randomInt(subcategoryInfo.min * 100, subcategoryInfo.max * 100) / 100;

      const dateTicks = new Date(
        targetMonth.getFullYear(),
        targetMonth.getMonth(),
        randomInt(1, daysInMonth)
      ).getTime();

      const accountId = accounts.find(
        (account) =>
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
        amount,
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
  getItemsByAccount,
};
