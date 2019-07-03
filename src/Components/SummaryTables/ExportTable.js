import React from "react";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core"

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
          <td>{d.date}</td>
          <td>{d.reportingdate}</td>
          <td>{d.currency}</td>
          <td>{d.location}</td>
          <td>{d.category}</td>
          <td>{d.subcategory}</td>
          <td>{d.to}</td>
          {/* Entries default to positive as cost - Excel uses negative as cost */}
          <td>{d.amount * -1}</td>
          <td>{d.details}</td>
          <td>{d.project}</td>
        </tr>
      );
    })
  );
  
  return (
    <React.Fragment>
      <button css={tw`shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-6`}
        onClick={copyDataToExport}
        disabled={dataToExport.length === 0}>
        Copy Data
      </button>
      <button css={tw`shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-6`}
        onClick={markDataAsExported}
        disabled={dataToExport.length === 0}>
        Mark as Exported
      </button>
      <table css={tw`table-auto`}>
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
        <tbody css={tw`hover:bg-grey-lighter`}>
          {exportRows}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default ExportTable;
