import React from "react";

const ExportTable = ({dataToExport, markDataAsExported}) => {
  const copyDataToExport = () => {
    const exportTable = document.getElementById("data-to-export");

    const selection = window.getSelection();
    const range = document.createRange();
    selection.removeAllRanges();
    range.selectNodeContents(exportTable);
    selection.addRange(range)
  
    document.execCommand("copy");
  }

  const exportRows = dataToExport.length === 0 ? null : (
    dataToExport.map((d, i) => {
      return (
        <tr key={i}>
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
      );
    })
  );
  
  return (
    <React.Fragment>
      <button 
        onClick={copyDataToExport}
        disabled={dataToExport.length === 0}>
        Copy Data
      </button>
      <button 
        onClick={markDataAsExported}
        disabled={dataToExport.length === 0}>
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
          {dataToExport.length === 0 ? null : (
    dataToExport.map(d => {
      return (
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
      );
    })
  )}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default ExportTable;