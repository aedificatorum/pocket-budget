import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MobileNavStyle = styled.div`
  @media (max-width: ${props => props.theme.breakpoint}) {
    display: block;
  }
  @media (min-width: ${props => props.theme.breakpoint}) {
    visibility: hidden;
  }
`;

const buttonStyle = styled.div`
`

const MobileNav = props => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <MobileNavStyle>
      <div>
        <button
          onClick={() => setIsExpanded(e => !e)}
          className="flex items-center px-3 py-2 border rounded text-accent-5 border-accent-5"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`${
          isExpanded ? `block` : `hidden`
        } w-full inline-block flex-grow lg:flex lg:items-center lg:w-auto`}
      >
        <div className="font-semibold lg:flex-grow text-right">
          <Link
            to="/about"
            className="block lg:inline-block hover:text-accent-3 p-2"
          >
            About
          </Link>
          <Link
            to="/blog"
            className="block lg:inline-block hover:text-accent-3 p-2"
          >
            Blog
          </Link>
        </div>
      </div>
    </MobileNavStyle>
  );
};

export default MobileNav;
