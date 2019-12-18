import React from "react";
import styled from "styled-components";
import { signOut } from "./Auth";
import Nav from "./Nav";
import HamburgerMenu from "./MobileNav";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  background-color: ${props => props.theme.accentOne};
  color: ${props => props.theme.textInverse};
  font-family: "Julius Sans One", sans-serif;

  div:first-child {
    font-weight: 600;
    flex-grow: 1;
    font-size: 1.5rem;

    @media (min-width: ${props => props.theme.breakpoint}) {
      & {
        font-size: 2rem;
      }
    }
  }
`;

const Header = ({ dataToExport }) => {
  return (
    <>
      <HeaderContainer>
        <div>Pocket Budget</div>
        <div>
          <HamburgerMenu signOut={signOut} />
        </div>
      </HeaderContainer>
      <Nav exportItemCount={dataToExport.length} />
    </>
  );
};

export default Header;
