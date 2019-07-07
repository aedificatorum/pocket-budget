import { useState, useEffect } from "react";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { ExportTable, SummaryTable } from "./Components/SummaryTables";
import AddBudgetItem from "./Components/AddBudgetItem";
import { addItem, removeItem, setAllExported, getPendingItems } from "./Components/InMemoryStore";
import { Switch, Route, Link } from "react-router-dom";

function App() {
  const [dataToExport, setDataToExport] = useState([]);

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
  },[]);

  return (
    <div css={tw`min-h-screen flex flex-col font-sansmx-auto ml-12 m-0 p-6`}>
      <header>
        <h1 css={tw`text-4xl p-6`}>
          <Link to="/">Pocket-Budget</Link>
        </h1>
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
              addNewItem={addRowToExport}
              id={routeProps.match.params.id}
            />
          }/>
        </Switch>
      </main>
      <footer css={tw`w-full text-center border-t border-grey p-4`}>
        Built by <a href="https://github.com/aedificatorum">Aedificatorum</a>.
      </footer>
    </div>
  );
}

export default App;
