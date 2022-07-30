import React from "react";
// libraries
import { useRouter } from "next/router";
// components
import Footer from "./FooterAction";
import Header from "./Header";

interface props {
  children: React.ReactNode;
}

const Layout = ({ children }: props) => {
  const router = useRouter();
  return (
    <>
      <Header />
      {children}
      {router.pathname === "/" && <Footer />}
    </>
  );
};

export default Layout;
