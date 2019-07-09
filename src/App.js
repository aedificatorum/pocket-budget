import { useState, useEffect, useContext } from "react";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import ExportTable from "./Components/ExportTable";
import SummaryTable from "./Components/SummaryTable";
import AddBudgetItem from "./Components/AddBudgetItem";
import { addItem, removeItem, setAllExported, getPendingItems, getItem, updateItem } from "./Components/InMemory";
import { setupAuth, signIn } from "./Components/Firebase"
import { Switch, Route, Link } from "react-router-dom";
import { AuthStateContext } from "./AuthStateProvider";

const App = () => {
  const [dataToExport, setDataToExport] = useState([]);
  const [authState, setAuthState] = useContext(AuthStateContext);

  const addRowToExport = (item) => {
    addItem(item);
    setDataToExport(getPendingItems());
  }

  const deleteItem = (id) => {
    removeItem(id);
    setDataToExport(getPendingItems());
  }

  const markDataAsExported = () => {
    setAllExported();
    setDataToExport(getPendingItems());
  }

  useEffect(() => {
    setDataToExport(getPendingItems());
  }, []);

  useEffect(() => {
    setupAuth(setAuthState);
    // When using inMemory calling signIn() here will skip the login step
    // signIn();
  },[setAuthState]);

  return !authState.userId ? (
    <button onClick={signIn}>Login</button>
  ) : (
      <div css={tw`min-h-screen flex flex-col font-sansmx-auto ml-12 m-0 p-6`}>
        <header>
          <h1 css={tw`text-4xl p-6`}>
            <Link to="/">Pocket-Budget</Link>
          </h1>
          <div css={tw`p-6`}>Logged In As: {authState.userId}</div>
          <nav css={tw`p-6`}>
            <ul css={tw`flex`}>
              <li css={tw`mr-6`}>
                <Link to="/" css={tw`text-blue-500 hover:text-blue-800`}>Home</Link>
              </li>
              <li css={tw`mr-6`}>
                <Link to="/data" css={tw`text-blue-500 hover:text-blue-800`}>Export Data ({dataToExport.length})</Link>
              </li>
              <li css={tw`mr-6`}>
                <Link to="/summary" css={tw`text-blue-500 hover:text-blue-800`}>Summary</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main css={tw`flex-grow p-6`}>
          <Switch>
            <Route exact path="/" component={() => <AddBudgetItem addNewItem={addRowToExport} />} />
            <Route path="/data" component={() => <ExportTable
              dataToExport={dataToExport}
              markDataAsExported={markDataAsExported} />} />
            <Route path="/summary" component={() => <SummaryTable
              dataToExport={dataToExport}
              deleteItem={deleteItem} />} />
            <Route path="/edit/:id" component={(routeProps) =>
              <AddBudgetItem
                getItem={getItem}
                id={routeProps.match.params.id}
                updateItem={updateItem}
              />
            } />
          </Switch>
        </main>
        <footer css={tw`w-full text-center border-t border-grey p-4`}>
          Built by <a href="https://github.com/aedificatorum">Aedificatorum</a>.
      </footer>
      </div>
    );
}

export default App;
