import React, { useState, useEffect } from "react";
import SummaryTable from "./Summary/SummaryTable";
import Header from "./Header";
import Admin from "./Admin";
import Overview from "./Overview";
import { AddEditBudgetItem, OneClick } from "./BudgetItemEditors";
import { getCategories, getAccounts } from "./Store";
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
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
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
      <Header />
      <main>
        <Switch>
          <Route
            exact
            path="/fullform"
            render={() => (
              <AddEditBudgetItem
                categories={categories}
                accounts={accounts}
              />
            )}
          />
          <Route
            exact
            path="/summary"
            render={routeProps => (
              <SummaryTable
                history={routeProps.history}
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
                returnAction={() => routeProps.history.push("/summary")}
              />
            )}
          />
          <Route
            exact
            path="/admin"
            render={() => <Admin categories={categories} />}
          />
          <Route exact path="/overview" render={() => <Overview accounts={accounts} />} />
          <Route
            exact
            path="/"
            render={() => <OneClick accounts={accounts} />}
          />
        </Switch>
      </main>
      <Footer />
      <BottomNavigation />
    </StyledMain>
  );
};

export default Home;
