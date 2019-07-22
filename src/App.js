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
} from "./Components/Firebase";
import { setupAuth, signIn, signOut } from "./Components/Firebase";
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
        css={tw`flex flex-col items-center bg-orange-400 text-white font-semibold p-6 justify-center text-4xl md:text-4xl md:hidden`}
      >
        <span>Pocket</span>Budget
      </h1>
      <h1
        css={tw`lg:flex flex-col items-center bg-orange-400 text-white font-semibold p-6 justify-center text-4xl md:text-4xl hidden`}
      >
        <div>Pocket-Budget</div>
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
      css={tw`min-h-screen flex flex-col font-sansmx-auto ml-12 m-0 px-4 pt-6`}
    >
      <header>
        <div css={tw`flex flex-row object-center`}>
          <img
            css={tw`flex rounded-full w-16 h-16 object-center shadow-md`}
            src={authState.userPhoto.toString()}
            alt="User Avatar"
          />
          <div css={tw`flex p-2`}>
            Welcome {authState.userName}
            <button css={tw`flex p-2`} onClick={updateState}>
              <img
                src="https://img.icons8.com/ios-glyphs/30/000000/refresh.png"
                alt="refresh-icon"
              />
            </button>
            <button css={tw`flex p-2`} onClick={signOut}>
              <img
                src="https://img.icons8.com/ios-glyphs/30/000000/logout-rounded-down.png"
                alt="logout-icon"
              />
            </button>
          </div>
        </div>
        <nav css={tw`p-4 pt-6`}>
          <ul css={tw`flex`}>
            <li css={tw`mr-6`}>
              <Link to="/" css={tw`text-blue-500 hover:text-blue-800`}>
                Home
              </Link>
            </li>
            <li css={tw`mr-6`}>
              <Link to="/quickadd" css={tw`text-blue-500 hover:text-blue-800`}>
                Quick Add
              </Link>
            </li>
            <li css={tw`mr-6`}>
              <Link to="/data" css={tw`text-blue-500 hover:text-blue-800`}>
                Export Data ({dataToExport.length})
              </Link>
            </li>
            <li css={tw`mr-6`}>
              <Link to="/summary" css={tw`text-blue-500 hover:text-blue-800`}>
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
      <footer css={tw`w-full text-center border-t border-grey p-2`}>
        Built by <a href="https://github.com/aedificatorum">Aedificatorum</a>
      </footer>
    </div>
  );
};

export default App;
