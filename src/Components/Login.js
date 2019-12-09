import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { signIn } from "./Auth";
import styled from "styled-components";
import { isProperty } from "@babel/types";

const StyledLoginPage = styled.div`

`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${ props => props.theme.accentOne };
  color: ${ props => props.theme.textInverse };
  font-size: 2.25rem;
  padding: 2rem;
  font-weight: 600;
`

const Login = () => {
  return (
    <div css={tw`flex flex-col h-screen bg-orange-100`}>
      <Header>
        Pocket <br css={tw`md:hidden`} />
        Budget
      </Header>
      <div css={tw`flex-1 m-auto flex flex-row items-center`}>
        <img
          src="Building-budget.jpg"
          alt="Budget Login Logo"
          css={tw`rounded-full shadow-2xl h-32 w-32 md:h-64 md:w-64`}
        />
      </div>
      <div css={tw`flex mx-auto p-12`}>
        <button
          css={tw`text-2xl lg:text-xl shadow-lg md:text-4xl border border-yellow-500 bg-orange-400 text-white block rounded-sm font-semibold py-3 px-6 flex items-center rounded-full`}
          onClick={signIn}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
