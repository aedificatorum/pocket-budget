import { useState } from "react";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { ExportTable, SummaryTable } from "./Components/SummaryTables";
import AddBudgetItem from "./Components/AddBudgetItem";
import { Switch, Route, Link } from "react-router-dom";

function App() {
  const [dataToExport, setDataToExport] = useState([]);

  const addRowToExport = ({ date, reportingdate, currency, location, category, subcategory, to, amount, details, project }) => {
    const newData = dataToExport.slice();
    newData.push({
      date, reportingdate, currency, location, category, subcategory, to, amount, details, project
    });
    setDataToExport(newData);
  }

  const markDataAsExported = () => {
    setDataToExport([]);
  }

  return (
    <div css={tw`min-h-screen flex flex-col font-sansmx-auto ml-12 m-0`}>
      <header>
        <h1 css={tw`text-4xl p-6`}>
          <Link to="/">Pocket-Budget</Link>
        </h1>
        <nav>
          <ul css={tw`flex`}>
            <li css={tw`mr-6`}>
              <Link to="/" css={tw`text-blue-500 hover:text-blue-800`}>Home</Link>
            </li>
            <li css={tw`mr-6`}>
              <Link to="/data" css={tw`text-blue-500 hover:text-blue-800`}>Export Data ({dataToExport.length})</Link>
            </li>
            <li css={tw`mr-6`}>
              <Link to="/summary" css={tw`text-blue-500 hover:text-blue-800`}>Summary Table</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main css={tw`flex-grow p-8`}>
        <Switch>
          <Route exact path='/' component={() => <AddBudgetItem addNewItem={addRowToExport} />} />
          <Route path='/data' component={() => <ExportTable
            dataToExport={dataToExport}
            markDataAsExported={markDataAsExported} />} />
          <Route path='/summary' component={() => <SummaryTable dataToExport={dataToExport}/>} />
        </Switch>
      </main>
      <footer css={tw`w-full text-center border-t border-grey p-4`}>
        Built by <a href="https://github.com/aedificatorum">Aedificatorum</a>.
      </footer>
    </div>
  );
}

export default App;
