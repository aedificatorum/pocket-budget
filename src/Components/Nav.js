import React from 'react'
import { Link } from "react-router-dom"
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";

const Nav = ({exportItemCount}) => {
  return (
    <nav css={tw`p-4 pt-6 bg-orange-200 sticky top-0`}>
        <ul css={tw`flex`}>
          <li css={tw`mr-6`}>
            <Link to="/" css={tw`text-grey-700`}>
              1-Click
            </Link>
          </li>
          <li css={tw`mr-6`}>
            <Link to="/fullform" css={tw`text-grey-700`}>
              Add
            </Link>
          </li>
          <li css={tw`md:mr-6 hidden md:inline`}>
            <Link to="/data" css={tw`text-grey-700`}>
              Export Data ({exportItemCount})
            </Link>
          </li>
          <li css={tw`mr-6`}>
            <Link to="/summary" css={tw`text-grey-700`}>
              Summary
            </Link>
          </li>
          <li css={tw`mr-6`}>
            <Link to="/admin" css={tw`text-grey-700`}>
              Admin
            </Link>
          </li>
        </ul>
      </nav>
  )
}

export default Nav;
