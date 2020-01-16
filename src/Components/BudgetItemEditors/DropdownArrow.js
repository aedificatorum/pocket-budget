import React from "react";
import styled from "styled-components";

const SvgContainer = styled.div`
  pointer-events: none;
  position: absolute;
  display: flex;
  top: 0;
  bottom: 0;
  right: 0;
  align-items: center;
  padding: 0rem 0.5rem;
`;

const DropdownArrow = () => (
  <SvgContainer>
    <svg
      style={{ fill: "currentColor", height: "1rem", width: "1rem" }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
    </svg>
  </SvgContainer>
);

export default DropdownArrow;
