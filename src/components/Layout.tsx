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
      <main>{children}</main>
    </>
  );
};

export default Layout;
