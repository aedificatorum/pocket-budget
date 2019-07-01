import React, { useState } from "react";
import styled from "@emotion/styled";
import tw from "tailwind.macro";
/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import ExportTable from "./Components/ExportTable"
import AddBudgetItem from "./Components/AddBudgetItem";
import { Switch, Route } from "react-router-dom";

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
    <React.Fragment>
      <h1 css={tw`text-4xl p-6`}>
        Pocket-Budget
      </h1>
      <main>
        <Switch>
          <Route exact path='/' component={() => <AddBudgetItem addNewItem={addRowToExport} />} />
          <Route path='/data' component={() => <ExportTable
            dataToExport={dataToExport}
            markDataAsExported={markDataAsExported} />} />
        </Switch>
      </main>
      <footer>
        Built by <a href="https://github.com/aedificatorum">Aedificatorum</a>.
      </footer>
    </React.Fragment>
  );
}

export default App;
