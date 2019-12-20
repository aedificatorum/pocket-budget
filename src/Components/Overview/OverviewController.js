import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { OverviewCard } from "./OverviewCard";
import { getTotalSpendForMonth } from "../Store";
import { FormattedNumber } from "react-intl";
import MonthPicker from './MonthPicker'

const OverviewContainer = styled.div`
  margin: 1rem 1rem 3rem 1rem;
  display: flex;
  flex-direction: column;
`;

const today = new Date();
const OverviewController = () => {
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

  const purchaseCount = items.length || 0;

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

  const totalSpendInUsd = items.reduce((acc, item) => {
    if (item.currency === "USD") {
      acc += item.amount;
    }
    return Math.round(acc);
  }, 0);

  return (
    <OverviewContainer>
      <section>
        <MonthPicker month={month} setMonth={setMonth} />
      </section>
      <div style={{ fontSize: "2rem", color: "red", alignSelf: "center" }}>
        <FormattedNumber
          value={totalSpendInUsd}
          style="currency"
          currency="usd"
        />
      </div>
      <div
        style={{
          fontSize: "1.5rem",
          alignSelf: "center",
          paddingBottom: "1rem"
        }}
      >
        {purchaseCount} transactions
      </div>
      {currencyOverviews}
    </OverviewContainer>
  );
};

export default OverviewController;
