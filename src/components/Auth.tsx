import { signIn } from "next-auth/react";

import React from "react";

const Auth = () => {
  return (
    <div>
      <button
        onClick={() => {
          signIn("github");
        }}
      >
        GitHub Auth
      </button>
    </div>
  );
};

export default Auth;
