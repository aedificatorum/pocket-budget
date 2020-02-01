import React, { useState } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { Container, CategoryButton, CategoryList, AccountList, ToList } from "./QuickAdd.styles";
import { getItemsByAccount } from "../Store/index";
import { getToday } from "../../Utils/dateUtils";

const sixtyDaysAgo =
  getToday()
    .add(-60, "day")
    .unix() * 1000;
const today =
  getToday()
    .add(1, "day")
    .unix() * 1000;

const QuickAdd = ({ accounts }) => {
  const [location, setLocation] = useState("");
  const [toItems, setToItems] = useState({
    items: [],
    loaded: false,
  });

  const categories = _.groupBy(accounts, "category");

  const updateToItems = async accountId => {
    const items = await getItemsByAccount(sixtyDaysAgo, today, accountId);
    const itemList = _.chain(items)
      .uniqBy("to")
      .sortBy("to")
      .take(20)
      .value();

    setToItems({
      loaded: true,
      items: itemList,
    });
  };

  const updateLocation = async (clickedLocation, accountId) => {
    // If a different location was clicked set to that
    if (clickedLocation !== location) {
      setLocation(clickedLocation);

      // Expanding a subcategory - get the to items
      if (clickedLocation.indexOf(".") > 0) {
        // To prevent a flash of old items, set loaded to false
        setToItems({ items: [], loaded: false });
        await updateToItems(accountId);

        // New location is a root - if it's the same root as before, collapse entire category
      } else if (location.substring(0, location.indexOf(".")) === clickedLocation) {
        setLocation("");
      }

      // Clicked a subcategory - expand to the nearest level
    } else if (clickedLocation.indexOf(".") > 0) {
      setLocation(clickedLocation.substring(0, clickedLocation.indexOf(".")));

      // Clicked on the same root node
    } else {
      setLocation("");
    }
  };

  return (
    <Container>
      <ul>
        {_.sortBy(Object.keys(categories)).map(category => {
          return (
            <CategoryList key={category}>
              <CategoryButton onClick={() => updateLocation(category)}>{category}</CategoryButton>
              {location.startsWith(`${category}`) &&
                categories[category].map(account => {
                  return (
                    <AccountList key={account.accountId}>
                      <li>
                        <button
                          onClick={async () =>
                            await updateLocation(`${category}.${account.name}`, account.accountId)
                          }
                        >
                          {account.name} {account.isIncome ? "(Income)" : null}
                        </button>
                        <Link
                          key={account.accountId}
                          to={{
                            pathname: "/fullform",
                            initialAccountId: account.accountId,
                          }}
                        >
                          <span role="img" aria-label="Add new item">
                            ➕
                          </span>
                        </Link>
                      </li>
                      {location.startsWith(`${category}.${account.name}`) && (
                        <ToList>
                          {!toItems.loaded ? (
                            <li>Loading...</li>
                          ) : (
                            <>
                              {toItems.items.map(item => {
                                return (
                                  <li key={item.to}>
                                    <div>{item.to}</div>
                                    <Link
                                      to={{
                                        pathname: "/fullform",
                                        initialAccountId: item.accountId,
                                        initialTo: item.to,
                                      }}
                                    >
                                      <span role="img" aria-label="Add new item">
                                        ➕
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </>
                          )}
                        </ToList>
                      )}
                    </AccountList>
                  );
                })}
            </CategoryList>
          );
        })}
      </ul>
    </Container>
  );
};

export default QuickAdd;
