import React, { useState, useEffect } from "react";
import Summary from "./Summary";
import Header from "./Header";
import Admin from "./Admin";
import Overview from "./Overview";
import { AddEditBudgetItem, OneClick } from "./BudgetItemEditors";
import QuickAdd from "./QuickAdd";
import { getAccounts } from "./Store";
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
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    let isSubscribed = true;

    const getInitialDataAsync = async () => {
      const accounts = await getAccounts();
      if (isSubscribed) {
        setAccounts(accounts);
      }
    };

    getInitialDataAsync();

    return () => (isSubscribed = false);
  }, []);

  return !accounts.length ? (
    <div>Loading...</div>
  ) : (
    <StyledMain>
      <ToastContainer hideProgressBar />
      <Header />
      <main>
        <Switch>
          <Route
            exact
            path="/fullform"
            render={routeProps => (
              <AddEditBudgetItem
                accounts={accounts}
                initialAccountId={routeProps.location.initialAccountId}
                initialTo={routeProps.location.initialTo}
              />
            )}
          />
          <Route exact path="/quickadd" render={() => <QuickAdd accounts={accounts} />} />
          <Route
            exact
            path="/summary"
            render={routeProps => <Summary history={routeProps.history} />}
          />
          <Route
            exact
            path="/edit/:id"
            render={routeProps => (
              <AddEditBudgetItem
                id={routeProps.match.params.id}
                accounts={accounts}
                returnAction={() => routeProps.history.push("/summary")}
              />
            )}
          />
          <Route exact path="/admin" render={() => <Admin accounts={accounts} />} />
          <Route exact path="/overview" render={() => <Overview accounts={accounts} />} />
          <Route exact path="/" render={() => <OneClick accounts={accounts} />} />
        </Switch>
      </main>
      <Footer />
      <BottomNavigation />
    </StyledMain>
  );
};

export default Home;
