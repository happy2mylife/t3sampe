import Head from "next/head";
import React, { FC, ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};
const Layout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta />
        <link rel="stylesheet" href="" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        {children}
      </main>
    </>
  );
};

export default Layout;
