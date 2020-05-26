import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";

const HeaderContainer = styled.div`
  padding: 0.5rem;
  background-color: ${props => props.theme.accentOne};
  color: ${props => props.theme.textInverse};
  font-family: "Julius Sans One", sans-serif;
  font-weight: 600;
  font-size: 1.25rem;

  @media (min-width: ${props => props.theme.breakpoint}) {
    font-size: 2rem;
  }
`;

const Header = () => {
  return (
    <>
      <HeaderContainer>
        <div>
          <Link to="/">Pocket Budget</Link>
        </div>
      </HeaderContainer>
      <Nav />
    </>
  );
};

export default Header;
