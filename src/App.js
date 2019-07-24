import { useState, useEffect, useContext } from "react";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import ExportTable from "./Components/ExportTable";
import SummaryTable from "./Components/SummaryTable";
import AddBudgetItem from "./Components/AddBudgetItem";
import QuickAdd from "./Components/AddBudgetItem/QuickAdd";
import {
  addItem,
  removeItem,
  setAllExported,
  getPendingItems,
  getItem,
  updateItem,
  getCategories
} from "./Components/InMemory";
import { setupAuth, signIn, signOut } from "./Components/InMemory";
import { Switch, Route, Link } from "react-router-dom";
import { AuthStateContext } from "./Components/AuthStateProvider";

const App = () => {
  const [dataToExport, setDataToExport] = useState([]);
  const [authState, setAuthState] = useContext(AuthStateContext);
  const [categories, setCategories] = useState([]);

  const updateState = async () => {
    setDataToExport(await getPendingItems());
  };

  const addRowToExport = async (id, item) => {
    await addItem(item);
    updateState();
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

  useEffect(() => {
    setupAuth(setAuthState);
    // When using inMemory calling signIn() here will skip the login step
    //signIn();
  }, [setAuthState]);

  return !authState.userId ? (
    <div css={tw`flex flex-col h-screen bg-orange-100`}>
      <h1
        css={tw`flex flex-col items-center bg-orange-400 text-white font-semibold p-6 justify-center text-4xl`}
      >
        Pocket <br css={tw`md:hidden`}/>Budget
      </h1>
      <div css={tw`flex-1 m-auto flex flex-row items-center`}>
        <img
          src="Building-budget.jpg"
          alt="Budget Login Logo"
          css={tw`rounded-full shadow-2xl h-32 w-32 md:h-64 md:w-64`}
        />
      </div>
      <div css={tw`flex mx-auto p-12`}>
        <button
          css={tw`text-2xl lg:text-xl shadow-lg md:text-4xl border  border-yellow-500 bg-orange-400 text-white block rounded-sm font-bold py-4 px-6 flex items-center rounded-full`}
          onClick={signIn}
        >
          Login
        </button>
      </div>
    </div>
  ) : (
    <div
      css={tw`min-h-screen flex flex-col font-sansmx-auto ml-12 m-0`}
    >
      <header>
        <div css={tw`flex flex-row object-center p-2 bg-orange-400 sticky top-0 `}>
          <img
            css={tw`flex rounded-full w-16 h-16 object-center shadow-md`}
            src={authState.userPhoto.toString()}
            alt="User Avatar"
          />
          <div css={tw`flex p-2 text-white text-lg w-4/6 items-center`}>
            <span css={tw`hidden md:inline-block`}>Welcome </span> {authState.userName}
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
            <li css={tw`md:mr-6 hidden`}>
              <Link to="/data" css={tw`text-grey-700`}>
                Export Data ({dataToExport.length})
              </Link>
            </li>
            <li css={tw`mr-6`}>
              <Link to="/summary" css={tw`text-grey-700`}>
                Summary
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main css={tw`flex-grow`}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <AddBudgetItem
                saveItem={addRowToExport}
                categories={categories}
              />
            )}
          />
          <Route
            exact
            path="/quickadd"
            render={() => (
              <QuickAdd saveItem={addRowToExport} categories={categories} />
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
              <AddBudgetItem
                getItem={getItem}
                id={routeProps.match.params.id}
                saveItem={editItem}
                categories={categories}
                returnAction={() => routeProps.history.push("/summary")}
              />
            )}
          />
        </Switch>
      </main>
      <footer css={tw`w-full text-white py-2 text-center border-t border-grey bg-orange-400`}>
        Built by <a href="https://github.com/aedificatorum">Aedificatorum</a>
      </footer>
    </div>
  );
};

export default App;
