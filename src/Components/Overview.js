import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { OverviewCard } from "./OverviewCard";
import { getTotalSpendThisMonth } from "../Components/Store";

const OverviewContainer = styled.div`
  margin: 1rem 2rem;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  h2 {
    font-size: 1.25rem;
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

  const categoriesPerCurrency = items.reduce((acc, item) => {
    if(acc[item.currency]) {
      if (acc[item.currency][item.category]) {
        acc[item.currency][item.category] += Math.round(item.amount)
      } else {
        acc[item.currency][item.category] = 1
      }
    } else {
      acc[item.currency] = {}
    }
    return acc
  },{})
  

  console.log(categoriesPerCurrency)

  const currencyOverviews = Object.keys(currencies).map(c => {
    return <OverviewCard key={c} currency={c} items={currencies[c]} categoriesPerCurrency={categoriesPerCurrency} />;
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
      <div style={{ fontSize: "2rem", color: "red" }}>
        {totalSpendInUsd} USD
      </div>
      <div style={{ fontSize: "1.5rem" }}>{purchaseCount} transactions</div>
      {currencyOverviews}
    </OverviewContainer>
  );
};

export default Overview;
