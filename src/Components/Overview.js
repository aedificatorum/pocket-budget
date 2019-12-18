import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getTotalSpendThisMonth } from "../Components/Store";

const OverviewContainer = styled.div`
  margin: 1rem 2rem;

  h1 {
    font-size: 2rem;
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

  return (
    <OverviewContainer>
      <h1>Month Overview</h1>
      {purchaseCount}
      <h2>Total spent</h2>
      <h2>Top categories</h2>
    </OverviewContainer>
  );
};

export default Overview;
