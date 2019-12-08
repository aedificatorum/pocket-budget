import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// TODO: Pull this from theme context
const StyledNavLink = styled.li`
  color: #4a5568;
  margin-right: 1.5rem;
`;

// TODO: Get background from theme context
const NavContainer = styled.nav`
  padding: 1.5rem 1rem 1rem 1rem;
  background-color: #feebc8;
  position: sticky;
  top: 0;

  ul {
    display: flex;
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
      </ul>
    </NavContainer>
  );
};

export default Nav;
