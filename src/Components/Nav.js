import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { signOut } from "./Auth";

const StyledNavLink = styled.li`
  @media (min-width: ${props => props.theme.breakpoint}) {
    margin-right: 2.5rem;
  }
`;

const NavContainer = styled.nav`
  padding: 1rem;
  color: ${props => props.theme.textDark};
  background-color: ${props => props.theme.accentTwo};
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-evenly;
  border-bottom: 0.0625rem solid ${props => props.theme.textDark};

  @media (max-width: ${props => props.theme.breakpoint}) {
    display: none;
  }

  ul {
    display: flex;
    font-weight: 500;
  }

  button {
    font-weight: 500;
  }
`;

const NavLink = ({ to, label }) => {
  return (
    <StyledNavLink>
      <Link to={to}>{label}</Link>
    </StyledNavLink>
  );
};

const Nav = ({ exportItemCount }) => {
  return (
    <NavContainer>
      <ul>
        <NavLink to="/" label="1-Click" />
        <NavLink to="/fullform" label="Add" />
        <NavLink to="/data" label={`Export Data (${exportItemCount})`} />
        <NavLink to="/summary" label="Summary" />
        <NavLink to="/overview" label="Overview" />
        <NavLink to="/admin" label="Admin" />
        <button onClick={signOut}>Log Out</button>
      </ul>
    </NavContainer>
  );
};

export default Nav;
