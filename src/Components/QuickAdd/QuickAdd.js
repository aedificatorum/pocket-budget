import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";
import { getItemsForPeriod } from "../Store/index";

const Container = styled.div`
  display: flex;
  max-width: 48rem;
  margin: auto;
  padding: 1.5rem;
`;

const CategoryList = styled.li`
  margin-bottom: 1rem;
`;

const CategoryButton = styled.button`
  font-weight: 600;
`;

const AccountList = styled.ul`
  margin-left: 1rem;
`;

const ToList = styled.ul`
  margin-left: 1rem;
`;

const QuickAdd = ({ accounts }) => {
  const [location, setLocation] = useState("");
  const [toItems, setToItems] = useState({
    items: [],
    loaded: false
  });

  const categories = _.groupBy(accounts, "category");

  const updateToItems = async accountId => {
    const items = await getItemsForPeriod(
      moment
        .utc()
        .add(-30, "day")
        .unix() * 1000,
      moment
        .utc()
        .add(1, "day")
        .unix() * 1000
    );
    const filtered = items.filter(item => item.accountId === accountId);
    const distinct = _.uniqBy(filtered, "to");
    const sorted = _.sortBy(distinct, "to");
    setToItems({
      loaded: true,
      items: _.take(sorted, 10)
    });
  };

  const updateLocation = async (clickedLocation, accountId) => {
    // If a different location was clicked set to that
    if (clickedLocation !== location) {
      setLocation(clickedLocation);
      if (clickedLocation.indexOf(".") > 0) {
        // Expanding a subcategory - get the to items
        // To prevent a flash of old items, set loaded to false
        setToItems({items:[], loaded: false});
        await updateToItems(accountId);
      }
    } else if (location.indexOf(".") > 0) {
      // Clicked a subcategory - expand to the nearest level
      setLocation(location.substring(0, location.indexOf(".")));
    } else {
      // Clicked on the same root node
      setLocation("");
    }
  };

  return (
    <Container>
      <ul>
        {_.sortBy(Object.keys(categories)).map(category => {
          return (
            <CategoryList key={category}>
              <CategoryButton onClick={() => updateLocation(category)}>
                {category}
              </CategoryButton>
              {location.startsWith(`${category}`) &&
                categories[category].map(account => {
                  return (
                    <AccountList key={account.accountId}>
                      <li>
                        <button
                          onClick={async () =>
                            await updateLocation(
                              `${category}.${account.name}`,
                              account.accountId
                            )
                          }
                        >
                          {account.name} {account.isIncome ? "(Income)" : null}
                        </button>{" "}
                        <Link
                          key={account.accountId}
                          to={{
                            pathname: "/fullform",
                            initialAccountId: account.accountId
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
                                    {item.to}{" "}
                                    <Link
                                      to={{
                                        pathname: "/fullform",
                                        initialAccountId: item.accountId,
                                        initialTo: item.to
                                      }}
                                    >
                                      <span
                                        role="img"
                                        aria-label="Add new item"
                                      >
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
