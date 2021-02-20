import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  color: ${(props) => props.theme.textInverse};
  background-color: ${(props) => props.theme.textNormal};
  text-align: center;
  padding: 0.25rem 0 0.25rem 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 0.0625rem solid ${(props) => props.theme.textDark};

  @media (max-width: ${(props) => props.theme.breakpoint}) {
    display: none !important;
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      Built by <a href="https://github.com/aedificatorum">Aedificatorum</a>
    </FooterContainer>
  );
}
