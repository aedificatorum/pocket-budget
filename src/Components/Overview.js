import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { OverviewCard } from "./OverviewCard";
import { getTotalSpendThisMonth } from "../Components/Store";
import { FormattedNumber } from 'react-intl'

const OverviewContainer = styled.div`
  margin: 1rem 1rem 3rem 1rem;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    justify-content:center;
    align-self:center;
  }
`;

const Overview = () => {
  const [items, setItems] = useState([]);

  const getEverything = async () => {
    setItems(await getTotalSpendThisMonth());
  };
  useEffect(() => {
    getEverything();
  }, []);

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
      <h1>Month Overview</h1>
      <div style={{ fontSize: "2rem", color: "red", alignSelf: "center" }}>
        <FormattedNumber value={totalSpendInUsd} style="currency" currency="usd"/>
      </div>
      <div style={{ fontSize: "1.5rem", alignSelf: "center", paddingBottom:"1rem" }}>{purchaseCount} transactions</div>
      {currencyOverviews}
    </OverviewContainer>
  );
};

export default Overview;
