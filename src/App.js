import React from "react";
import styled from "@emotion/styled";
import tw from "tailwind.macro";
/** @jsx jsx */
import { css, jsx } from "@emotion/core"

// Create a component with @emotion/styled
const Section = styled.div`
${tw`bg-red-900 min-h-screen flex flex-col items-center justify-center text-xl text-white`};
`;

const Footer = styled.footer`
${tw`bg-red-900 text-center text-lg text-white`};
`;

function App() {
  const copyDataToExport = () => {
    const dataToExport = document.getElementById("data-to-export");

    const selection = window.getSelection();
    const range = document.createRange();
    selection.removeAllRanges();
    range.selectNodeContents(dataToExport);
    selection.addRange(range)
  
    document.execCommand("copy");
  }

  return (
    <React.Fragment>
      <Section>
        Pocket-Budget
      </Section>
      <div>
        <button onClick={copyDataToExport}>
          Copy Data
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
          {/* To copy into excel we need to copy the table, not just the body - and we dont want headrs */}
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
      </div>
      <Footer>
        Built by <a href="https://github.com/aedificatorum">Aedificatorum</a>.
      </Footer>
    </React.Fragment>
  );
}

export default App;
