import React from "react";
import styled from "@emotion/styled";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";

const admin = ({ categories }) => {
  console.log(categories);
  return (
    <div>
      <table css={tw`table-auto w-full text-left`}>
        {categories.map((category, i) => {
          return <tr key={i}>{category.name}</tr>;
        })}
      </table>
    </div>
  );
};

export default admin;
