import React, { useState } from "react";
import styled from "styled-components";
import Papa from "papaparse";
import { getItemsForReportingPeriod, addItem, getAccounts } from "./Store";
import { ticksToISODateString } from "Utils/dateUtils";
import { CSVLink } from "react-csv";
import { localStorageKeys } from "../LocalStorageKeys";

const Admin = ({ accounts }) => {
  const [exportData, setExportData] = useState([]);
  const [inputCSV, setInputCSV] = useState("");

  const importDataFromCSV = async () => {
    const accounts = await getAccounts();
    const parse = Papa.parse(inputCSV, { header: true });

    const transactions = parse.data.map((t) => {
      const transaction = {
        ...t,
        amount: parseFloat(t.amount),
        dateTicks: parseInt(t.dateTicks),
        reportingDateTicks: parseInt(t.reportingDateTicks),
      };

      // remove optional fields
      if (!transaction.details) {
        transaction.details = "";
      }
      if (!transaction.project) {
        transaction.project = "";
      }

      return transaction;
    });

    let errors = 0;
    transactions.forEach((t) => {
      if (!accounts.find((a) => a.accountId === t.accountId)) {
        console.warn("Account Id not found, skipping:", t);
        errors++;
      }
    });

    if (errors > 0) {
      alert(`${errors} accounts missing, aborting upload.`);
      return;
    }

    let loaded = 0;
    for (const transaction of transactions) {
      try {
        await addItem(transaction);
      } catch (err) {
        alert(err);
        return; // fail-fast
      }
      loaded++;
    }

    alert(`${loaded} transactions added`);
  };

  const removeDefaults = () => {
    localStorageKeys.forEach((k) => {
      localStorage.removeItem(k);
    });
  };

  const loadData = async () => {
    setExportData(await getItemsForReportingPeriod(0, new Date().getTime()));
  };

  const csvData = exportData.map((item) => {
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
      id: item.id,
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

    @media (max-width: ${(props) => props.theme.breakpoint}) {
      margin: 1rem 2rem;
      font-size: 1rem;
      flex-direction: column;
      h2 {
        font-size: 1.25rem;
      }
    }
  `;

  const SectionStyled = styled.div`
    font-size: 1.05rem;
    margin-bottom: 1.5rem;
    line-height: 1.75rem;
  `;

  const StyledButton = styled.button`
    background-color: ${(props) => props.theme.accentOne};
    color: ${(props) => props.theme.textInverse};
    padding: 0.5rem;
    margin-top: 1rem;
    border-radius: 0.5rem;
    :hover {
      background-color: ${(props) => props.theme.accentTwo};
      color: ${(props) => props.theme.textNormal};
    }
    @media (max-width: ${(props) => props.theme.breakpoint}) {
      padding: 0.5rem;
    }
  `;

  const BorderStyle = styled.div`
    border: 0.0625rem solid ${(props) => props.theme.textNormal};
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  `;

  return (
    <AdminContainer>
      <SectionStyled>
        <h2>Accounts</h2>
        <BorderStyle></BorderStyle>
        {accounts.map((account, i) => {
          return (
            <ul key={i}>
              <li>
                {account.category} - {account.name} {account.isIncome ? "(Income)" : null}
              </li>
            </ul>
          );
        })}
      </SectionStyled>
      <SectionStyled>
        <h2>Defaults (Local Storage)</h2>
        <BorderStyle></BorderStyle>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {localStorageKeys.map((k) => {
            return (
              <div key={k}>
                {k}:{localStorage.getItem(k)}
              </div>
            );
          })}
          <StyledButton onClick={removeDefaults}>Reset</StyledButton>
        </div>
      </SectionStyled>
      <SectionStyled>
        <h2>Export</h2>
        <BorderStyle></BorderStyle>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {exportData.length === 0 ? (
            <StyledButton onClick={async () => await loadData()}>Load Data Export</StyledButton>
          ) : (
            <CSVLink data={csvData}>Download All</CSVLink>
          )}
        </div>
      </SectionStyled>
      <SectionStyled>
        <h2>Import</h2>
        <BorderStyle></BorderStyle>
        <div style={{ display: "flex", flexDirection: "column", marginTop: "1rem" }}>
          <textarea
            style={{ border: "solid 0.0625rem black", borderRadius: "0.5rem" }}
            name="csvInput"
            value={inputCSV}
            onChange={(e) => {
              setInputCSV(e.target.value);
            }}
          ></textarea>
          <StyledButton
            onClick={async (e) => {
              e.preventDefault();
              await importDataFromCSV();
            }}
          >
            Import
          </StyledButton>
        </div>
      </SectionStyled>
    </AdminContainer>
  );
};

export default Admin;
