import React, { useState }  from "react";
import styled from "@emotion/styled";
import tw from "tailwind.macro";
/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import ExportTable from "./Components/ExportTable"
import AddBudgetItem from "./Components/AddBudgetItem";

function App() {
  const [dataToExport, setDataToExport] = useState([]);

  const addRowToExport = ({date, reportingdate, currency, location, category, subcategory, to, amount, details, project}) => {
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
      <h1>
        Pocket-Budget
      </h1>
      <div>
        <AddBudgetItem addNewItem={addRowToExport}/>
      </div>
      <div>
        <ExportTable
          dataToExport={dataToExport}
          markDataAsExported={markDataAsExported}/>
      </div>
      <footer>
        Built by <a href="https://github.com/aedificatorum">Aedificatorum</a>.
      </footer>
    </React.Fragment>
  );
}

export default App;
