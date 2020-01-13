import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  max-width: 48rem;
  margin: auto;
`;

const CategoryGroup = styled.li`
  margin-bottom: 1rem;
`;

const AccountList = styled.ul`
  margin-left: 1rem;
`;

const ToList = styled.ul`
  margin-left: 1rem;
`;

const QuickAdd = ({ accounts }) => {
  const [location, setLocation] = useState("");

  const categories = _.groupBy(accounts, "category");

  const updateLocation = clickedLocation => {
    // If we click the same location collapse instead
    if (clickedLocation === location) {
      setLocation("");
    } else {
      setLocation(clickedLocation);
    }
  };

  return (
    <Container>
      <ul>
        {Object.keys(categories).map(category => {
          return (
            <CategoryGroup key={category}>
              <button onClick={() => updateLocation(category)}>
                {category}
              </button>
              {location.startsWith(`${category}`) &&
                categories[category].map(account => {
                  return (
                    <AccountList key={account.accountId}>
                      <li>
                        <button onClick={() => updateLocation(`${category}.${account.name}`)}>
                          {account.name} {account.isIncome ? "(Income)" : null}
                        </button>
                        {" "}
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
                          <li>Hey you clicked on the account!</li>
                        </ToList>
                      )}
                    </AccountList>
                  );
                })}
            </CategoryGroup>
          );
        })}
      </ul>
    </Container>
  );
};

export default QuickAdd;
