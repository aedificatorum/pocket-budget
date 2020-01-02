import React, { useState, useEffect } from "react";
import ExportTable from "./ExportTable";
import SummaryTable from "./SummaryTable";
import Header from "./Header";
import Admin from "./Admin";
import Overview from "./Overview";
import { AddEditBudgetItem, OneClick } from "./BudgetItemEditors";
import { getPendingItems, getCategories, getAccounts } from "./Store";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { BottomNavigation } from "./BottomNavigation";
import "react-toastify/dist/ReactToastify.min.css";
import Footer from "./Footer";
import styled from "styled-components";

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: auto;
  position: relative;

  main {
    margin-bottom: 2.5rem;
  }
`;

const Home = () => {
  const [dataToExport, setDataToExport] = useState([]);
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const updateState = async () => {
    setDataToExport(await getPendingItems());
  };

  useEffect(() => {
    updateState();

    let isSubscribed = true;

    const getInitialDataAsync = async () => {
      const cats = await getCategories();
      const accounts = await getAccounts();
      if (isSubscribed) {
        setCategories(cats);
        setAccounts(accounts);
      }
    };

    getInitialDataAsync();

    return () => (isSubscribed = false);
  }, []);

  return !accounts.length || !categories.length ? <div>Loading...</div> : (
    <StyledMain>
      <ToastContainer hideProgressBar />
      <Header dataToExport={dataToExport} />
      <main>
        <Switch>
          <Route
            exact
            path="/fullform"
            render={() => (
              <AddEditBudgetItem
                updateState={updateState}
                categories={categories}
                accounts={accounts}
              />
            )}
          />
          <Route
            exact
            path="/data"
            render={() => (
              <ExportTable
                dataToExport={dataToExport}
                updateState={updateState}
                accounts={accounts}
              />
            )}
          />
          <Route
            exact
            path="/summary"
            render={routeProps => (
              <SummaryTable
                dataToExport={dataToExport}
                updateState={updateState}
                history={routeProps.history}
                accounts={accounts}
              />
            )}
          />
          <Route
            exact
            path="/edit/:id"
            render={routeProps => (
              <AddEditBudgetItem
                id={routeProps.match.params.id}
                categories={categories}
                accounts={accounts}
                updateState={updateState}
                returnAction={() => routeProps.history.push("/summary")}
              />
            )}
          />
          <Route
            exact
            path="/admin"
            render={() => <Admin categories={categories} accounts={accounts} />}
          />
          <Route exact path="/overview" render={() => <Overview accounts={accounts} categories={categories} />} />
          <Route
            exact
            path="/"
            render={() => <OneClick updateState={updateState} accounts={accounts} />}
          />
        </Switch>
      </main>
      <Footer />
      <BottomNavigation />
    </StyledMain>
  );
};

export default Home;
