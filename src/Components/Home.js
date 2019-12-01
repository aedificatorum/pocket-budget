import { useState, useEffect } from "react";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import ExportTable from "./ExportTable";
import SummaryTable from "./SummaryTable";
import Header from "./Header";
import Admin from "./Admin";
import {
  AddEditBudgetItem,
  OneClick
} from "./BudgetItemEditors";
import {
  addItem,
  removeItem,
  setAllExported,
  getPendingItems,
  getItem,
  updateItem,
  getCategories,
  getSpeedyAdd
} from "./Store";
import { Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Home = () => {
  const [dataToExport, setDataToExport] = useState([]);
  const [categories, setCategories] = useState([]);

  const updateState = async () => {
    setDataToExport(await getPendingItems());
  };

  const addRowToExport = async (id, item) => {
    try {
      await addItem(item);
      toast.success("Item added! 🦄");
      updateState();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const editItem = async (id, item) => {
    await updateItem(id, item);
    updateState();
  };

  const deleteItem = async id => {
    await removeItem(id);
    updateState();
  };

  const markDataAsExported = async () => {
    await setAllExported();
    updateState();
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
                saveItem={addRowToExport}
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
                markDataAsExported={markDataAsExported}
              />
            )}
          />
          <Route
            exact
            path="/summary"
            render={routeProps => (
              <SummaryTable
                dataToExport={dataToExport}
                deleteItem={deleteItem}
                history={routeProps.history}
              />
            )}
          />
          <Route
            exact
            path="/edit/:id"
            render={routeProps => (
              <AddEditBudgetItem
                getItem={getItem}
                id={routeProps.match.params.id}
                saveItem={editItem}
                categories={categories}
                deleteItem={deleteItem}
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
            render={() => (
              <OneClick saveItem={addRowToExport} getSpeedyAdd={getSpeedyAdd} />
            )}
          />
        </Switch>
      </main>
      <footer
        css={tw`absolute bottom-0 w-full text-white py-1 text-center bg-orange-400`}
      >
        Built by <a href="https://github.com/aedificatorum">Aedificatorum</a>
      </footer>
    </div>
  );
};

export default Home;
