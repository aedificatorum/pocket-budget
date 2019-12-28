import React from "react";
import styled from "styled-components";
import CategoryCard from "./CategoryCard";
import { sortedSummaryAmountByProperty } from "./util/GrouperUtils";

const OverviewCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
  padding: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

export const OverviewCard = ({ items, currency }) => {
  const sortedTotal = sortedSummaryAmountByProperty(
    items,
    "category",
    "amount"
  );

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
        {`Transactions in ${currency}`}
      </div>
      {sortedTotal.map(category => {
        return (
          <CategoryCard
            key={category.category}
            items={items.filter(item => item.category === category.category)}
            category={category.category}
            currency={currency}
          />
        );
      })}
    </OverviewCardLayout>
  );
};
