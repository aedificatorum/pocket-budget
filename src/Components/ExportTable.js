import React from "react";
import { setAllExported } from "./Store";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${props => props.theme.accentOne};
  color: ${props => props.theme.textInverse};
  display: flex;
  padding: 0.5rem;
  border-radius: 0.5rem;
  justify-content: center;
  font-weight: 600;
  margin: 0.5rem;
  width: 100%;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  :hover {
    background-color: ${props => props.theme.accentTwo};
    color: ${props => props.theme.textNormal};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  max-width: 24rem;
  margin: 1.5rem 0rem;
`;

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
          <ButtonContainer>
            <StyledButton onClick={copyDataToExport}>Copy Data</StyledButton>
            <StyledButton
              onClick={async () => {
                await setAllExported();
                await updateState();
              }}
            >
              Mark as Exported
            </StyledButton>
          </ButtonContainer>
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
            <tbody>{exportRows}</tbody>
          </table>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ExportTable;
