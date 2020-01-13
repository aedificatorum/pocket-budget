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

const QuickAdd = ({ accounts }) => {
  const [location, setLocation] = useState("");

  const categories = _.groupBy(accounts, "category");
  
  const updateLocation = (clickedLocation) => {
    if(clickedLocation === location) {
      setLocation("");
    } else {
      setLocation(clickedLocation);
    }
  }

  return (
    <Container>
      <ul>
        {Object.keys(categories).map(category => {
          return (
            <CategoryGroup>
              <button onClick={() => updateLocation(category)}>{category}</button>
              {location.startsWith(`${category}`) && categories[category].map(account => {
                return (
                  <Link
                    key={account.accountId}
                    to={{
                      pathname: "/fullform",
                      initialAccountId: account.accountId
                    }}
                  >
                    <li>
                      {account.name} {account.isIncome ? "(Income)" : null}
                    </li>
                  </Link>
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
