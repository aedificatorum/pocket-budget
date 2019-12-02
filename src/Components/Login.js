import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { signIn } from "./Auth";

const Login = () => {
  return (
    <div css={tw`flex flex-col h-screen bg-orange-100`}>
      <h1
        css={tw`flex flex-col items-center bg-orange-400 text-white font-semibold p-6 justify-center text-4xl`}
      >
        Pocket <br css={tw`md:hidden`} />
        Budget
      </h1>
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
