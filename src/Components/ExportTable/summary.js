import React from "react";
import styled from "@emotion/styled";
import tw from "tailwind.macro";
/** @jsx jsx */
import { css, jsx } from "@emotion/core"

const SummaryTable = ({ dataToExport, markDataAsExported }) => {
    const copyDataToExport = () => {
        const exportTable = document.getElementById("data-to-export");

        const selection = window.getSelection();
        const range = document.createRange();
        selection.removeAllRanges();
        range.selectNodeContents(exportTable);
        selection.addRange(range)

        document.execCommand("copy");
    }

    const TableBody = styled.td`
    ${tw`py-4 px-6 border-b border-grey-light`};
    `;

    const exportRows = dataToExport.length === 0 ? null : (
        dataToExport.map((d, i) => {
            return (
                <tr key={i}>
                    <TableBody>{d.date}</TableBody>
                    <TableBody>{d.reportingdate}</TableBody>
                    <TableBody>{d.currency}</TableBody>
                    <TableBody>{d.location}</TableBody>
                    <TableBody>{d.category}</TableBody>
                    <TableBody>{d.subcategory}</TableBody>
                    <TableBody>{d.to}</TableBody>
                    {/* Entries default to positive as cost - Excel uses negative as cost */}
                    <TableBody>{d.amount * -1}</TableBody>
                    <TableBody>{d.details}</TableBody>
                    <TableBody>{d.project}</TableBody>
                </tr>
            );
        })
    );

    const ExportTD = styled.td`
  ${tw`py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light`};
  `;

    return (
        <div css={tw``}>
            <table css={tw`table-auto w-full text-left`} id="data-to-export">
                <thead>
                    <tr>
                        <ExportTD>Date</ExportTD>
                        <ExportTD>Reporting Date</ExportTD>
                        <ExportTD>Currency</ExportTD>
                        <ExportTD>Location</ExportTD>
                        <ExportTD>Category</ExportTD>
                        <ExportTD>Subcategory</ExportTD>
                        <ExportTD>To</ExportTD>
                        <ExportTD>Amount</ExportTD>
                        <ExportTD>Details</ExportTD>
                        <ExportTD>Project</ExportTD>
                    </tr>
                </thead>
                <tbody css={tw`hover:bg-grey-lighter`}>
                    {exportRows}
                </tbody>
            </table>
        </div>
    );
};

export default SummaryTable;