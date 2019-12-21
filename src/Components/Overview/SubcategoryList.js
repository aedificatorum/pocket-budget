import React from "react";
import styled from "styled-components";
import { FormattedNumber } from "react-intl";

const SubCategoryStyle = styled.div`
  margin: 0.5rem 0.5rem 0rem 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SubCategoryList = ({ items, currency }) => {
  const subCategoryTotal = items.reduce((acc, item) => {
    if (acc[item.subcategory]) {
      acc[item.subcategory] += item.amount;
    } else {
      acc[item.subcategory] = item.amount;
    }
    return acc;
  }, {});

  const sortedTotal = [];

  for (let subCategory in subCategoryTotal) {
    sortedTotal.push({ subCategory, total: subCategoryTotal[subCategory] });
  }

  sortedTotal.sort((a, b) => {
    return b.total - a.total;
  });

  return (
    <>
      {sortedTotal.map(subCategoryInfo => {
        return (
          <SubCategoryStyle key={subCategoryInfo.subCategory}>
            <div>{subCategoryInfo.subCategory}</div>
            <div>
              <FormattedNumber
                style="currency"
                currency={currency}
                value={subCategoryInfo.total}
              />
            </div>
          </SubCategoryStyle>
        );
      })}
    </>
  );
};

export default SubCategoryList;
