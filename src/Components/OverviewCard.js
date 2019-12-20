import React from "react";
import styled from "styled-components";
import { FormattedNumber } from "react-intl";

const OverviewCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
  padding: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

export const OverviewCard = ({ items, currency }) => {
  const totalPerCategory = items.reduce((acc, items) => {
    if (acc[items.category]) {
      acc[items.category] += items.amount;
    } else {
      acc[items.category] = items.amount;
    }
    return acc;
  }, {});

  const sortedTotal = [];

  for (let category in totalPerCategory) {
    sortedTotal.push([category, totalPerCategory[category]]);
  }

  sortedTotal.sort((a, b) => {
    return b[1] - a[1];
  });

  return (
    <OverviewCardLayout>
      <div
        style={{
          marginBottom: "1rem",
          fontWeight: "600",
          alignSelf: "center",
          fontSize: "1.25rem"
        }}
      >
        {`${items.length} transactions in ${currency}`}
      </div>
      {sortedTotal.map(category => {
        return (
          <div key={category[0]} style={{ display: "flex", flexDirection:"row", justifyContent:"space-between" }}>
            <div>{category[0]}</div>
            <div>
              <FormattedNumber
                style="currency"
                currency={currency}
                value={category[1]}
              />
            </div>
          </div>
        );
      })}
    </OverviewCardLayout>
  );
};
