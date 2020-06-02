import React from "react";
import styled from "styled-components";
import { FormattedNumber } from "react-intl";
import { sortedSummaryAmountByProperty } from "../../Utils/GrouperUtils";

const SubCategoryStyle = styled.div`
  margin: 0.5rem 0.5rem 0rem 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: peach;
`;

const SubCategoryList = ({ items, currency, groupBy }) => {
  groupBy ? (groupBy = "subcategory") : (groupBy = "to");
  const sortedTotal = sortedSummaryAmountByProperty(items, groupBy, "amount");

  return (
    <>
      {sortedTotal.map(subCategoryInfo => {
        return (
          <SubCategoryStyle key={subCategoryInfo[groupBy]}>
            <div>{subCategoryInfo[groupBy]}</div>
            <div>
              <FormattedNumber
                // eslint-disable-next-line
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
