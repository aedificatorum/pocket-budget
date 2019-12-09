import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { signIn } from "./Auth";
import styled from "styled-components";
import { isProperty } from "@babel/types";
import Logo from "./Logo"

const StyledLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${ props => props.theme.accentTwo };
  height: 100vh;
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
    <StyledLoginPage>
      <Header>
        Pocket <br css={tw`md:hidden`} />
        Budget
      </Header>
      <div css={tw`flex-1 m-auto flex flex-row items-center`}>
        <Logo width={400} height={400} />
        {/* <img
          src="undraw-saving.svg"
          alt="Budget Login Logo"
          css={tw`rounded-full shadow-2xl h-32 w-32 md:h-64 md:w-64`}
        /> */}
      </div>
      <div css={tw`flex mx-auto p-12`}>
        <button
          css={tw`text-2xl lg:text-xl shadow-lg md:text-4xl border border-yellow-500 bg-orange-400 text-white block rounded-sm font-semibold py-3 px-6 flex items-center rounded-full`}
          onClick={signIn}
        >
          Login
        </button>
      </div>
    </StyledLoginPage>
  );
};

export default Login;
