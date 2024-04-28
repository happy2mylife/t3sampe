import { signIn } from "next-auth/react";

import React from "react";

const Auth = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <button
        className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
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
