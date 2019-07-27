import styled from "@emotion/styled";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link } from "react-router-dom";
import MediaQuery from 'react-responsive'

const SummaryTable = ({ dataToExport, deleteItem }) => {

  const TDRow = styled.td`
    ${tw`py-4 px-2 md:px-6 border-b border-grey-light`};
    `;

  const dateToString = (date) => date ? date.toISOString().substr(0, 10) : undefined;

  const exportRows = dataToExport.length === 0 ? null : (
    dataToExport.sort((a,b) => b.date - a.date).map((d, i) => {
      return (


        <tr key={i}>
          <MediaQuery minDeviceWidth={1224}>
            <TDRow>{dateToString(d.date)}</TDRow>
            <TDRow>{dateToString(d.reportingDate)}</TDRow>
            <TDRow>{d.currency}</TDRow>
            <TDRow>{d.location}</TDRow>
            <TDRow>{d.category}</TDRow>
            <TDRow>{d.subcategory}</TDRow>
            <TDRow>{d.to}</TDRow>
            {/* Entries default to positive as cost - Excel uses negative as cost */}
            <TDRow>{d.amount * -1}</TDRow>
            <TDRow>{d.details}</TDRow>
            <TDRow>{d.project}</TDRow>
            <TDRow><Link to={`/edit/${d.id}`}>Edit</Link></TDRow>
            <TDRow><button onClick={() => deleteItem(d.id)}>Delete</button></TDRow>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={640}>
            <TDRow>{dateToString(d.date)}</TDRow>
            <TDRow>{d.to}</TDRow>
            {/* Entries default to positive as cost - Excel uses negative as cost */}
            <TDRow css={tw`text-right pr-6`}>{d.amount * -1}</TDRow>
            <TDRow><Link to={`/edit/${d.id}`}>Edit</Link></TDRow>
          </MediaQuery>
        </tr>
      );
    })
  );

  const TDHeader = styled.td`
  ${tw`py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light`};
  `;

  return (
    <div>
      <MediaQuery minDeviceWidth={1224}>
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
      </MediaQuery>
      <MediaQuery maxDeviceWidth={640}>
        <table css={tw`table-auto w-full text-left`}>
          <thead>
            <tr>
              <TDHeader>Date</TDHeader>
              <TDHeader>To</TDHeader>
              <TDHeader>Amount</TDHeader>
              <TDHeader></TDHeader>
            </tr>
          </thead>
          <tbody css={tw`hover:bg-grey-lighter`}>
            {exportRows}
          </tbody>
        </table>
      </MediaQuery>
    </div>
  );
};

export default SummaryTable;