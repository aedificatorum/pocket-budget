import React from "react";

const ExportTable = () => {
  const copyDataToExport = () => {
    const dataToExport = document.getElementById("data-to-export");

    const selection = window.getSelection();
    const range = document.createRange();
    selection.removeAllRanges();
    range.selectNodeContents(dataToExport);
    selection.addRange(range)
  
    document.execCommand("copy");
  }

  const markDataAsExported = () => {
    alert("Not yet implemented!");
  }
  
  return (
    <React.Fragment>
      <button 
        onClick={copyDataToExport}>
        Copy Data
      </button>
      <button onClick={markDataAsExported}>
        Mark as Exported
      </button>
      <table>
        <thead>
          <tr>
            <td>Date</td>
            <td>Reporting Date</td>
            <td>Currency</td>
            <td>Location</td>
            <td>Category</td>
            <td>Subcategory</td>
            <td>To</td>
            <td>Amount</td>
            <td>Details</td>
            <td>Project</td>
          </tr>
        </thead>
      </table>
      {/* To copy into excel we need to copy the table, not just the body - and we dont want headers */}
      <table id="data-to-export">
        <tbody>
          <tr>
            <td>2019-06-30</td>
            <td>2019-06-30</td>
            <td>USD</td>
            <td>New York</td>
            <td>Food</td>
            <td>Restaurant</td>
            <td>SANS</td>
            <td>-40.30</td>
            <td>Starter, Main</td>
          </tr>
          <tr>
            <td>2019-06-30</td>
            <td>2019-06-30</td>
            <td>USD</td>
            <td>New York</td>
            <td>Food</td>
            <td>Cafe</td>
            <td>Starbucks</td>
            <td>-4.50</td>
            <td>Espresso</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default ExportTable;