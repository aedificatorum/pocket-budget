import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getItemsForReportingPeriod } from "../Store";
import { useSetNavMenuItems } from "../Provider/NavMenuItemsContext";
import CurrencyOverview from "./CurrencyOverview";
import PeriodPicker from "../DatePickers/PeriodPicker";
import { groupBy } from "../../Utils/GrouperUtils";
import { sortBy } from "Utils/utils";

const OverviewContainer = styled.div`
  margin: 1rem 1rem 3rem 1rem;
  display: flex;
  flex-direction: column;
  @media (min-width: ${(props) => props.theme.breakpoint}) {
    max-width: 50rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2rem;
  }
`;

const GroupByButton = styled.div`
  padding: 0.5rem;
`;

const FilterButton = styled.div`
  margin-right: 0.25rem;
  margin-top: 0.25rem;
  padding: 0.25rem;
  color: white;
  height: 40px;
  width: 40px;
  position: absolute;
  right: 0;
  top: 0;
`;

// TODO: Read from local storage/app setting/etc.
const DEFAULT_CURRENCY = "USD";

const Overview = ({ accounts }) => {
  const [items, setItems] = useState([]);
  const [ticks, setTicks] = useState({ fromTicks: null, toTicks: null });
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [groupBySubCategory, setGroupBySubCategory] = useState(true);
  const setMenuItems = useSetNavMenuItems();

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

  useEffect(() => {
    setMenuItems([
      <FilterButton
        onClick={() => {
          setIsFilterExpanded((f) => !f);
        }}
      >
        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
        </svg>
      </FilterButton>,
    ]);

    return () => {
      setMenuItems([]);
    };
  }, [setMenuItems]);

  const currencies = groupBy(items, "currency");
  const currencyOverviews = sortBy(Object.keys(currencies), (item) => {
    return item === DEFAULT_CURRENCY ? "AAA" : item;
  }).map((c) => {
    return (
      <CurrencyOverview
        key={c}
        accounts={accounts}
        currency={c}
        items={currencies[c]}
        groupBy={groupBySubCategory}
      />
    );
  });

  return (
    <OverviewContainer>
      <div style={{ display: isFilterExpanded ? "block" : "none" }}>
        <PeriodPicker ticks={ticks} setTicks={setTicks} />
      </div>
      <GroupByButton
        onClick={() => {
          setGroupBySubCategory((s) => !s);
        }}
      >
        Group By: {groupBySubCategory ? "sub-categories" : "sellers"}
      </GroupByButton>

      {currencyOverviews}
    </OverviewContainer>
  );
};

export default Overview;
