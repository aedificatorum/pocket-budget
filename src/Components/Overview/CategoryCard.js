import React, { useState } from "react";
import styled from "styled-components";
import SubCategoryList from "./SubcategoryList";
import { formatCurrency } from "../../Utils/currencyUtils";

const categoryEmoji = {
  Food: "🍲",
  Health: "⚕️",
  Housing: "🏠",
  Income: "💵",
  Miscellaneous: "🧐",
  Entertainment: "😊",
  Personal: "👫",
  Clothing: "👚",
  Sport: "🤸‍♀️",
  Property: "🏘️",
  Transportation: "🐫",
  Utilities: "⚡",
  Vacation: "🌴",
  Investment: "💰",
  "Personal Care": "🛀",
};

const CategorySummaryStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 0.0625rem solid lightgrey;
  font-size: 1.125rem;
  color: ${(props) => props.theme.textNormal};
`;

const CategoryCard = ({ items, category, currency, groupBy }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const categorySum = items.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);
  return (
    <>
      <CategorySummaryStyle>
        <button onClick={() => setIsExpanded((e) => !e)}>
          {categoryEmoji[category]} {category}
        </button>
        <div style={{ fontWeight: isExpanded ? "600" : "normal" }}>
          {formatCurrency(currency, categorySum)}
        </div>
      </CategorySummaryStyle>
      <div
        style={{
          display: isExpanded ? "block" : "none",
          marginBottom: "1.5rem",
        }}
      >
        <SubCategoryList items={items} currency={currency} groupBy={groupBy} />
      </div>
    </>
  );
};

export default CategoryCard;
