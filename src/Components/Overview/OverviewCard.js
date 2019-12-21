import React, { useState } from "react";
import styled from "styled-components";
import { FormattedNumber } from "react-intl";

const categoryEmoji = {
  Food: "🍲",
  Health: "⚕️",
  House: "🏠",
  Income: "💵",
  Miscellaneous: "🧐",
  Entertainment: "😊",
  Personal: "👫",
  Travel: "🧳"
};

const OverviewCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
  padding: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const TableRowStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 0.0625rem solid lightgrey;
  font-size: 1.125rem;
  color: ${props => props.theme.textNormal};
`;

const SubCategoryStyle = styled.div`
  margin: 0.5rem .5rem 0rem .5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SubCategoryList = ({ items, currency }) => {
  const subCatTotal = items.reduce((acc, item) => {
    if (acc[item.subcategory]) {
      acc[item.subcategory] += item.amount;
    } else {
      acc[item.subcategory] = item.amount;
    }
    return acc;
  }, {});
  return (
    <>
      {Object.keys(subCatTotal).map(subCat => {
        return (
          <SubCategoryStyle key={subCat}>
            <div>{subCat}</div>
            <div>
              <FormattedNumber
                style="currency"
                currency={currency}
                value={subCatTotal[subCat]}
              />
            </div>
          </SubCategoryStyle>
        );
      })}
      {/* {items.map(item => {
        return <div key={item.id}>{item.subcategory}</div>;
      })} */}
    </>
  );
};

const CategoryCard = ({ items, category, currency }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const categorySum = items.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);
  return (
    <>
      <TableRowStyle>
        <button onClick={() => setIsExpanded(e => !e)}>
          {categoryEmoji[category]} {category}
        </button>
        <div style={{fontWeight: isExpanded ? "600" : "normal"}}>
          <FormattedNumber
            style="currency"
            currency={currency}
            value={categorySum}
          />
        </div>
      </TableRowStyle>
      <div style={{ display: isExpanded ? "block" : "none", marginBottom: "1.5rem" }}>
        <SubCategoryList items={items} currency={currency} />
      </div>
    </>
  );
};

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
    sortedTotal.push({ category, total: totalPerCategory[category] });
  }

  sortedTotal.sort((a, b) => {
    return b.total - a.total;
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
