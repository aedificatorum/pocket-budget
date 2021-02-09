import React, { useState } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { Container, CategoryText, CategoryList, AccountList, ToList } from "./QuickAdd.styles";
import { getItemsByAccount } from "../Store/index";
import { getTodayTicks } from "../../Utils/dateUtils";
import { groupBy } from "../../Utils/GrouperUtils";

const sixtyDaysAgo = getTodayTicks(-60);
const tomorrow = getTodayTicks(1);

const QuickAdd = ({ accounts }) => {
  const [location, setLocation] = useState("");
  const [toItems, setToItems] = useState({
    items: [],
    loaded: false,
    location: "",
  });

  const categories = groupBy(accounts, "category");

  const updateToItems = async (accountId) => {
    const items = await getItemsByAccount(sixtyDaysAgo, tomorrow, accountId);
    const itemList = _.chain(items).uniqBy("to").sortBy("to").take(20).value();

    setToItems({
      loaded: true,
      items: itemList,
      location: toItems.location,
    });
  };

  const updateLocation = async (clickedLocation, accountId) => {
    // If a different location was clicked set to that
    if (clickedLocation !== location) {
      setLocation(clickedLocation);

      // Expanding a subcategory - get the to items
      if (clickedLocation.indexOf(".") > 0) {
        // To prevent a flash of old items, set loaded to false
        setToItems({ items: [], loaded: false, location: clickedLocation });
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
        {_.sortBy(Object.keys(categories)).map((category) => {
          return (
            <CategoryList key={category}>
              <CategoryText onClick={async () => await updateLocation(category)}>
                {category}
              </CategoryText>
              {location.startsWith(`${category}`) &&
                categories[category].map((account) => {
                  const accountSelected = location.startsWith(`${category}.${account.name}`);
                  const hasMore = !accountSelected || !toItems.loaded ? "..." : "";
                  return (
                    <AccountList key={account.accountId}>
                      <li>
                        <div
                          onClick={async () =>
                            await updateLocation(`${category}.${account.name}`, account.accountId)
                          }
                        >
                          {`${account.name}${account.isIncome ? " (Income)" : ""}${hasMore}`}
                        </div>
                        <Link
                          to={{
                            pathname: "/summary",
                            search: `?accountId=${account.accountId}`,
                          }}
                        >
                          <span role="img" aria-label="Add new item">
                            ?
                          </span>
                        </Link>
                        <Link
                          to={{
                            pathname: "/fullform",
                            initialAccountId: account.accountId,
                          }}
                        >
                          <span role="img" aria-label="Add new item">
                            +
                          </span>
                        </Link>
                      </li>
                      {accountSelected && (
                        <ToList>
                          {!toItems.loaded ? (
                            <li>Loading...</li>
                          ) : (
                            <>
                              {toItems.items.map((item) => {
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
                                        +
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
