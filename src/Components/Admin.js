import React, { useState } from "react";
import styled from "styled-components";
import { getItemsForReportingPeriod } from "./Store";
import { ticksToISODateString } from "../Utils/dateUtils";
import { CSVLink } from "react-csv";

const localStorageKeys = [
  "default_currency",
  "default_location",
  "default_project"
];

const Admin = ({ categories }) => {
  const [exportData, setExportData] = useState([]);

  const removeDefaults = () => {
    localStorageKeys.forEach(k => {
      localStorage.removeItem(k);
    });
  };

  const loadData = async () => {
    setExportData(await getItemsForReportingPeriod(0, new Date().getTime()));
  };

  const csvData = exportData.map(item => {
    return {
      date: ticksToISODateString(item.dateTicks),
      reportingDate: ticksToISODateString(item.reportingDateTicks),
      currency: item.currency,
      location: item.location,
      category: item.category,
      subcategory: item.subcategory,
      to: item.to,
      amount: item.amount,
      details: item.details,
      project: item.project,
      accountId: item.accountId,
      id: item.id
    };
  });

  const AdminContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 2rem 10rem;
    justify-content: space-around;
    font-size: 1.125rem;
    h2 {
      font-size: 1.75rem;
    }

    @media (max-width: ${props => props.theme.breakpoint}) {
      margin: 1rem 2rem;
      font-size: 1rem;
      height: 500px;
      flex-direction: column;
      h2 {
        font-size: 1.25rem;
      }
    }
  `;

  const StyledButton = styled.button`
    background-color: ${props => props.theme.accentOne};
    color: ${props => props.theme.textInverse};
    padding: 1rem;
    margin-top: 3rem;
    border-radius: 0.5rem;
    :hover {
      background-color: ${props => props.theme.accentTwo};
      color: ${props => props.theme.textNormal};
    }
    @media (max-width: ${props => props.theme.breakpoint}) {
      margin-top: 2rem;
      padding: 0.75rem;
    }
  `;

  const BorderStyle = styled.div`
    border: 0.125rem solid ${props => props.theme.textNormal};
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  `;

  return (
    <AdminContainer>
      <section>
        <h2>Categories</h2>
        <BorderStyle></BorderStyle>
        {categories.map((category, i) => {
          return (
            <ul key={i}>
              <li>{category.name}</li>
            </ul>
          );
        })}
      </section>
      <section>
        <h2>Defaults (Local Storage)</h2>
        <BorderStyle></BorderStyle>
        {localStorageKeys.map(k => {
          return (
            <div key={k}>
              {k}:{localStorage.getItem(k)}
            </div>
          );
        })}
        <StyledButton onClick={removeDefaults}>Remove Defaults</StyledButton>
      </section>
      <section>
        {exportData.length === 0 ? (
          <button onClick={async () => await loadData()}>
            Load Data Export
          </button>
        ) : (
          <CSVLink data={csvData}>Download All</CSVLink>
        )}
      </section>
    </AdminContainer>
  );
};

export default Admin;
