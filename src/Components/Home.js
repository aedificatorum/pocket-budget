import { useState, useEffect } from "react";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import ExportTable from "./ExportTable";
import SummaryTable from "./SummaryTable";
import Admin from "./Admin";
import { AddEditBudgetItem, QuickAddBudgetItem, SpeedyAdd } from "./BudgetItemEditors";
import {
  addItem,
  removeItem,
  setAllExported,
  getPendingItems,
  getItem,
  updateItem,
  getCategories
} from "./InMemory";
import { Switch, Route, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import PropTypes from "prop-types";

const propTypes = {
  authState: PropTypes.shape({
    userPhoto: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired
  }).isRequired,
  signOut: PropTypes.func.isRequired
};

const Home = ({ authState, signOut }) => {
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
      <header>
        <div css={tw`flex flex-row object-center p-2 bg-orange-400`}>
          <img
            css={tw`flex rounded-full w-16 h-16 object-center shadow-md`}
            src={authState.userPhoto}
            alt="User Avatar"
          />
          <div css={tw`flex p-2 text-white text-lg w-4/6 items-center`}>
            <span css={tw`hidden md:inline-block mr-1`}>Welcome </span>{" "}
            {authState.userName}
          </div>
          <button css={tw`flex w-1/6`} onClick={updateState}>
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/refresh.png"
              alt="refresh-icon"
            />
          </button>
          <button css={tw`flex w-1/6`} onClick={signOut}>
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/logout-rounded-down.png"
              alt="logout-icon"
            />
          </button>
        </div>
        <nav css={tw`p-4 pt-6 bg-orange-200 sticky top-0`}>
          <ul css={tw`flex`}>
            <li css={tw`mr-6`}>
              <Link to="/" css={tw`text-grey-700`}>
                Home
              </Link>
            </li>
            <li css={tw`mr-6`}>
              <Link to="/quickadd" css={tw`text-grey-700`}>
                Quick Add
              </Link>
            </li>
            <li css={tw`mr-6`}>
              <Link to="/speedyadd" css={tw`text-grey-700`}>
                Speedy Add
              </Link>
            </li>
            <li css={tw`md:mr-6 hidden md:inline`}>
              <Link to="/data" css={tw`text-grey-700`}>
                Export Data ({dataToExport.length})
              </Link>
            </li>
            <li css={tw`mr-6`}>
              <Link to="/summary" css={tw`text-grey-700`}>
                Summary
              </Link>
            </li>
            <li css={tw`mr-6`}>
              <Link to="/admin" css={tw`text-grey-700`}>
                Admin
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main css={tw`pb-6`}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <AddEditBudgetItem
                saveItem={addRowToExport}
                categories={categories}
              />
            )}
          />
          <Route
            exact
            path="/quickadd"
            render={() => (
              <QuickAddBudgetItem
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
            render={() => (
              <SummaryTable
                dataToExport={dataToExport}
                deleteItem={deleteItem}
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
            render={() => (
              <Admin
                categories={categories}
              />
            )}
          />
           <Route
            exact
            path="/speedyadd"
            render={() => (
              <SpeedyAdd
                saveItem={editItem}
              />
            )}
          />
        </Switch>
      </main>
      <footer
        css={tw`absolute bottom-0 w-full text-white py-2 text-center border-t border-grey bg-orange-400`}
      >
        Built by <a href="https://github.com/aedificatorum">Aedificatorum</a>
      </footer>
    </div>
  );
};

Home.propTypes = propTypes;

export default Home;
