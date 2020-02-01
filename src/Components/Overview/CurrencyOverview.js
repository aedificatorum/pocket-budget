import React from "react";
import styled from "styled-components";
import { FormattedNumber } from "react-intl";
import { OverviewCard } from "./OverviewCard";
import _ from "lodash";

const ItemTypeSection = styled.section`
  .header-container {
    font-size: 1.25rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0.5rem;
    padding: 1rem;
    font-weight: 600;
  }
`;

const CurrencyOverview = ({ accounts, currency, items }) => {
  const incomeAccounts = accounts.filter(a => a.isIncome).map(a => a.accountId);

  const expenseItems = items.filter(item => !incomeAccounts.includes(item.accountId));

  const incomeItems = items.filter(item => incomeAccounts.includes(item.accountId));

  const totalIncome = _.sumBy(incomeItems, "amount");
  const totalExpense = _.sumBy(expenseItems, "amount");

  return (
    <div>
      {incomeItems.length ? (
        <ItemTypeSection>
          <div className="header-container">
            <div>Income</div>
            <div style={{ color: "#2ECC40" }}>
              <FormattedNumber
                value={totalIncome}
                // eslint-disable-next-line
                style="currency"
                currency={currency}
              />
            </div>
          </div>
          <div>
            <OverviewCard currency={currency} items={incomeItems} />
          </div>
        </ItemTypeSection>
      ) : null}
      {expenseItems.length ? (
        <ItemTypeSection>
          <div className="header-container">
            <div>Expenses</div>
            <div style={{ color: "#FF4136" }}>
              <FormattedNumber
                value={totalExpense}
                // eslint-disable-next-line
                style="currency"
                currency={currency}
              />
            </div>
          </div>
          <div>
            <OverviewCard currency={currency} items={expenseItems} />
          </div>
        </ItemTypeSection>
      ) : null}
    </div>
  );
};

export default CurrencyOverview;
