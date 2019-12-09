import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  color: ${props => props.theme.textInverse};
  background-color: ${props => props.theme.accentOne};
  text-align: center;
  padding: 0.25rem 0 0.25rem 0;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export default function Footer() {
  return (
    <FooterContainer>
      Built by <a href="https://github.com/aedificatorum">Aedificatorum</a>
    </FooterContainer>
  );
}
