import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getItemsForReportingPeriod } from "../Store";
import CurrencyOverview from "./CurrencyOverview";
import PeriodPicker from "../DatePickers/PeriodPicker";
import _ from "lodash";

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

// TODO: Read from local storage/app setting/etc.
const DEFAULT_CURRENCY = "USD";

const Overview = ({ accounts }) => {
  const [items, setItems] = useState([]);
  const [ticks, setTicks] = useState({ fromTicks: null, toTicks: null });

  const getItems = async (fromTicks, toTicks) => {
    const items = await getItemsForReportingPeriod(fromTicks, toTicks);

    setItems(items);
  };

  useEffect(() => {
    // Only run the query when these have been set
    if (ticks.fromTicks && ticks.toTicks) {
      getItems(ticks.fromTicks, ticks.toTicks);
    }
  }, [ticks.fromTicks, ticks.toTicks]);

  const currencies = _.groupBy(items, "currency");
  const currencyOverviews = _.sortBy(Object.keys(currencies), item => {
    return item === DEFAULT_CURRENCY ? "AAA" : item;
  }).map(c => {
    return (
      <CurrencyOverview
        key={c}
        accounts={accounts}
        currency={c}
        items={currencies[c]}
      />
    );
  });

  return (
    <OverviewContainer>
      <section>
        <PeriodPicker ticks={ticks} setTicks={setTicks} />
      </section>

      {currencyOverviews}
    </OverviewContainer>
  );
};

export default Overview;
