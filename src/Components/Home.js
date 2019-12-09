import { useState, useEffect } from "react";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
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
    <div css={tw`min-h-screen relative flex flex-col mx-auto ml-12 m-0`}>
      <ToastContainer hideProgressBar />
      <Header dataToExport={dataToExport} />
      <main css={tw`pb-6`}>
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
    </div>
  );
};

export default Home;
