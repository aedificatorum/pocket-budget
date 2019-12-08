import React from "react";
import { Link } from "react-router-dom";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "styled-components";

const StyledNavLink = styled.li`
  color: #4a5568;
  margin-right: 1.5rem;
`;

const NavLink = ({to, label, hideOnMobile = false}) => {
  const className = hideOnMobile ? "hide-on-mobile" : ""
  
  return (
  <StyledNavLink className={className}>
    <Link to={to}>
      {label}
    </Link>
  </StyledNavLink>
)
}

const Nav = ({ exportItemCount }) => {
  return (
    <nav css={tw`p-4 pt-6 bg-orange-200 sticky top-0`}>
      <ul css={tw`flex`}>
        <NavLink to="/" label="1-Click" />
        <NavLink to="/fullform" label="Add" />
        <NavLink to="/data" label={`Export Data (${exportItemCount})`} hideOnMobile />
        <NavLink to="/summary" label="Summary" />
      </ul>
    </nav>
  );
};

export default Nav;
