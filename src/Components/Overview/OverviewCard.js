import React from "react";
import styled from "styled-components";
import CategoryCard from "./CategoryCard";
import { sortedSummaryAmountByProperty } from "../../Utils/GrouperUtils";

const OverviewCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

export const OverviewCard = ({ items, currency, groupBy }) => {
  const sortedTotal = sortedSummaryAmountByProperty(items, "category", "amount");

  return (
    <OverviewCardLayout>
      {sortedTotal.map((category) => {
        return (
          <CategoryCard
            key={category.category}
            items={items.filter((item) => item.category === category.category)}
            category={category.category}
            currency={currency}
            groupBy={groupBy}
          />
        );
      })}
    </OverviewCardLayout>
  );
};
