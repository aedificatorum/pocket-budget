import React, { useState, useEffect } from "react";
import ExportTable from "./ExportTable";
import SummaryTable from "./SummaryTable";
import Header from "./Header";
import Admin from "./Admin";
import { AddEditBudgetItem, OneClick } from "./BudgetItemEditors";
import { getPendingItems, getCategories } from "./Store";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Footer from "./Footer";
import styled from 'styled-components'

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: auto;
  position: relative;
`

const Home = () => {
  const [dataToExport, setDataToExport] = useState([]);
  const [categories, setCategories] = useState([]);

  const updateState = async () => {
    setDataToExport(await getPendingItems());
  };

  useEffect(() => {
    updateState();

    let isSubscribed = true;

    const getCategoriesAsync = async () => {
      const cats = await getCategories();
      if (isSubscribed) {
        setCategories(cats);
      }
    };

    getCategoriesAsync();
    return () => (isSubscribed = false);
  }, []);

  return (
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
                updateState={updateState}
                returnAction={() => routeProps.history.push("/summary")}
              />
            )}
          />
          <Route
            exact
            path="/admin"
            render={() => <Admin categories={categories} />}
          />
          <Route
            exact
            path="/"
            render={() => <OneClick updateState={updateState} />}
          />
        </Switch>
      </main>
      <Footer />
    </StyledMain>
  );
};

export default Home;
