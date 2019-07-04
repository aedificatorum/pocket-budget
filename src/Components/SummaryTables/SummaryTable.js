import styled from "@emotion/styled";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";

const SummaryTable = ({ dataToExport }) => {

  const TDRow = styled.td`
    ${tw`py-4 px-6 border-b border-grey-light`};
    `;

  const exportRows = dataToExport.length === 0 ? null : (
    dataToExport.map((d, i) => {
      return (
        <tr key={i}>
          <TDRow>{d.date}</TDRow>
          <TDRow>{d.reportingdate}</TDRow>
          <TDRow>{d.currency}</TDRow>
          <TDRow>{d.location}</TDRow>
          <TDRow>{d.category}</TDRow>
          <TDRow>{d.subcategory}</TDRow>
          <TDRow>{d.to}</TDRow>
          {/* Entries default to positive as cost - Excel uses negative as cost */}
          <TDRow>{d.amount * -1}</TDRow>
          <TDRow>{d.details}</TDRow>
          <TDRow>{d.project}</TDRow>
          <TDRow><button>Edit</button></TDRow>
          <TDRow><button>Delete</button></TDRow>
        </tr>
      );
    })
  );

  const TDHeader = styled.td`
  ${tw`py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light`};
  `;

  return (
    <div>
      <table css={tw`table-auto w-full text-left`}>
        <thead>
          <tr>
            <TDHeader>Date</TDHeader>
            <TDHeader>Reporting Date</TDHeader>
            <TDHeader>Currency</TDHeader>
            <TDHeader>Location</TDHeader>
            <TDHeader>Category</TDHeader>
            <TDHeader>Subcategory</TDHeader>
            <TDHeader>To</TDHeader>
            <TDHeader>Amount</TDHeader>
            <TDHeader>Details</TDHeader>
            <TDHeader>Project</TDHeader>
            <TDHeader></TDHeader>
            <TDHeader></TDHeader>

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