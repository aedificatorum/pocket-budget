import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getItemsForReportingPeriod } from "../Store";
import CurrencyOverview from "./CurrencyOverview";
import MonthPicker from "./MonthPicker";
import _ from "lodash";
import moment from "moment";

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

const today = new Date();
const Overview = ({ accounts }) => {
  const [items, setItems] = useState([]);

  // TODO: This should be a 'period picker', and provide start/end, as well as last month, last 3 months, etc.
  const [month, setMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const getItems = async month => {
    const startOfMonth = moment.utc([month.getFullYear(), month.getMonth(), 1]);
    const endOfMonth = moment.utc(startOfMonth).add(1, "month");

    const items = await getItemsForReportingPeriod(
      startOfMonth.unix() * 1000,
      endOfMonth.unix() * 1000
    );

    setItems(items);
  };

  useEffect(() => {
    getItems(month);
  }, [month]);

  const currencies = _.groupBy(items, "currency");
  const currencyOverviews = Object.keys(currencies).map(c => {
    return (
      <CurrencyOverview
        accounts={accounts}
        currency={c}
        items={currencies[c]}
      />
    );
  });

  return (
    <OverviewContainer>
      <section>
        <MonthPicker month={month} setMonth={setMonth} />
      </section>

      {currencyOverviews}
    </OverviewContainer>
  );
};

export default Overview;
