import React from "react";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { setAllExported } from "./Store";

const ExportTable = ({ dataToExport, updateState }) => {
  const copyDataToExport = () => {
    const exportTable = document.getElementById("data-to-export");

    const selection = window.getSelection();
    const range = document.createRange();
    selection.removeAllRanges();
    range.selectNodeContents(exportTable);
    selection.addRange(range);

    document.execCommand("copy");
  };

  const dateToString = date =>
    date ? date.toISOString().substr(0, 10) : undefined;

  const exportRows =
    dataToExport.length === 0
      ? null
      : dataToExport.map((d, i) => {
          return (
            <tr key={i}>
              <td>{dateToString(d.date)}</td>
              <td>{dateToString(d.reportingDate)}</td>
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
        });

  return (
    <React.Fragment>
      {dataToExport.length === 0 ? (
        <div>Nothing to export</div>
      ) : (
        <React.Fragment>
          <div css={tw`flex flex-row justify-between pb-4`}>
            <button
              css={tw`flex w-1/2 m-1 shadow bg-orange-400 hover:bg-orange-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-2 rounded`}
              onClick={copyDataToExport}
            >
              Copy Data
            </button>
            <button
              css={tw`flex w-1/2 m-1 shadow bg-orange-400 hover:bg-orange-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-2 rounded`}
              onClick={async () =>{
                await setAllExported();
                await updateState();
              }}
            >
              Mark as Exported
            </button>
          </div>
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
            <tbody css={tw`hover:bg-grey-lighter`}>{exportRows}</tbody>
          </table>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ExportTable;
