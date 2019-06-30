import React, { useState }  from "react";
import styled from "@emotion/styled";
import tw from "tailwind.macro";
/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import ExportTable from "./Components/ExportTable"

// Create a component with @emotion/styled
const Section = styled.div`
${tw`bg-red-900 min-h-screen flex flex-col items-center justify-center text-xl text-white`};
`;

const Footer = styled.footer`
${tw`bg-red-900 text-center text-lg text-white`};
`;

function App() {
  const [dataToExport, setDataToExport] = useState([]);

  return (
    <React.Fragment>
      <Section>
        Pocket-Budget
      </Section>
      <div>
        <ExportTable dataToExport={dataToExport}/>
      </div>
      <Footer>
        Built by <a href="https://github.com/aedificatorum">Aedificatorum</a>.
      </Footer>
    </React.Fragment>
  );
}

export default App;
