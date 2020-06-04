import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";
import { useNavMenuItems } from "./Provider/NavMenuItemsContext";

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
  const menuItems = useNavMenuItems();

  return (
    <>
      <HeaderContainer>
        <Link to="/">Pocket Budget</Link>
        {menuItems.map((e, i) => {
          return <div key={i}>{e}</div>;
        })}
      </HeaderContainer>
      <Nav />
    </>
  );
};

export default Header;
