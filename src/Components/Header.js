import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";
import MobileNav from "./MobileNav";

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

const Header = () => {
  return (
    <>
      <HeaderContainer>
        <div>
          <Link to="/">Pocket Budget</Link>
        </div>
        <div>
          <MobileNav />
        </div>
      </HeaderContainer>
      <Nav />
    </>
  );
};

export default Header;
