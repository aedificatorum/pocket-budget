import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled.li`
  @media (min-width: ${ props => props.theme.breakpoint }) {
    margin-right: 2.5rem;
  }
`;

const NavContainer = styled.nav`
  padding: 1rem;
  color: ${ props => props.theme.textDark };
  background-color: ${ props => props.theme.accentTwo };
  position: sticky;
  top: 0;
  border-bottom: .0625rem solid ${ props => props.theme.textDark };

  ul {
    display: flex;

    @media (max-width: ${ props => props.theme.breakpoint }) {
      justify-content: space-around;
    }
  }
`;

const NavLink = ({ to, label, hideOnMobile = false }) => {
  const className = hideOnMobile ? "hide-on-mobile" : "";

  return (
    <StyledNavLink className={className}>
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
        <NavLink
          to="/data"
          label={`Export Data (${exportItemCount})`}
          hideOnMobile
        />
        <NavLink to="/summary" label="Summary" />
        <NavLink to="/admin" label="Admin" hideOnMobile />
      </ul>
    </NavContainer>
  );
};

export default Nav;
