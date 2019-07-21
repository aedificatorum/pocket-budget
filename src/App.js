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
    <div css={tw`flex flex-col bg-gray-500 h-screen`}>
        <h1 css={tw`flex p-6 justify-center text-4xl md:text-6xl`}>
          Pocket-Budget
        </h1>
        <div css={tw`flex-1 mx-auto`}>
          <img
            src="Building-budget.jpg"
            alt="Budget Login Logo"
            css={tw`rounded-full h-32 w-32 md:h-64 md:w-64 self-center`}
          />
        </div>
        <div css={tw`flex mx-auto p-12`}>
          <button css={tw`font-medium text-2xl md:text-4xl`} onClick={signIn}>
            Login
          </button>
      </div>
    </div>
  ) : (
    <div css={tw`min-h-screen flex flex-col font-sansmx-auto ml-12 m-0 p-6`}>
      <header>
        <img
          css={tw`flex rounded-full w-16 h-16`}
          src={authState.userPhoto.toString()}
          alt="User Avatar"
        />
        <div css={tw`p-6`}>
          Welcome {authState.userId}.
          <button css={tw`p-6`} onClick={signOut}>
            Logout
          </button>
          <button css={tw`p-6`} onClick={updateState}>
            Refresh
          </button>
        </div>
        <nav css={tw`p-6`}>
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
            component={() => (
              <AddBudgetItem
                saveItem={addRowToExport}
                categories={categories}
              />
            )}
          />
          <Route
            exact
            path="/quickadd"
            component={() => (
              <QuickAdd saveItem={addRowToExport} categories={categories} />
            )}
          />
          <Route
            path="/data"
            component={() => (
              <ExportTable
                dataToExport={dataToExport}
                markDataAsExported={markDataAsExported}
              />
            )}
          />
          <Route
            path="/summary"
            component={() => (
              <SummaryTable
                dataToExport={dataToExport}
                deleteItem={deleteItem}
              />
            )}
          />
          <Route
            path="/edit/:id"
            component={routeProps => (
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
      <footer css={tw`w-full text-center border-t border-grey p-4`}>
        Built by <a href="https://github.com/aedificatorum">Aedificatorum</a>.
      </footer>
    </div>
  );
};

export default App;
