import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { OverviewCard } from "./OverviewCard";
import { getTotalSpendForMonth } from "../Store";
import { FormattedNumber } from "react-intl";
import MonthPicker from "./MonthPicker";

const OverviewContainer = styled.div`
  margin: 1rem 1rem 3rem 1rem;
  display: flex;
  flex-direction: column;
  @media (min-width: ${props => props.theme.breakpoint}) {
    max-width: 50rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2rem;
  }
`;

const TotalDisplayStyle = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.5rem;
  margin: 0rem 2rem;
`

const today = new Date();
const Overview = () => {
  const [items, setItems] = useState([]);
  const [month, setMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const getItems = async month => {
    setItems(await getTotalSpendForMonth(month));
  };
  useEffect(() => {
    getItems(month);
  }, [month]);

  const currencies = items.reduce((acc, item) => {
    if (acc[item.currency]) {
      acc[item.currency].push(item);
    } else {
      acc[item.currency] = [item];
    }
    return acc;
  }, {});

  const currencyOverviews = Object.keys(currencies).map(c => {
    return <OverviewCard key={c} currency={c} items={currencies[c]} />;
  });

  const summaryTotals = items.reduce((acc, item) => {
      if(item.currency === "USD") {
        if(item.amount < 0) {
          acc.incomeUSD += Math.abs(item.amount);
        } else {
          acc.spendUSD += item.amount;
        }
      }
      return acc;
  }, { spendUSD: 0, incomeUSD: 0})

  console.log(summaryTotals);

  const totalSpendInUsd = summaryTotals.spendUSD;

  const totalIncomeInUsd = summaryTotals.incomeUSD;

  return (
    <OverviewContainer>
      <section>
        <MonthPicker month={month} setMonth={setMonth} />
      </section>
      <TotalDisplayStyle>
        <div style={{ color: "#FF4136" }}>
          <FormattedNumber
            value={totalSpendInUsd}
            style="currency"
            currency="usd"
          />
        </div>
        <div style={{ color: "#2ECC40" }}>
          <FormattedNumber
            value={totalIncomeInUsd}
            style="currency"
            currency="usd"
          />
        </div>
      </TotalDisplayStyle>
      {currencyOverviews}
    </OverviewContainer>
  );
};

export default Overview;
