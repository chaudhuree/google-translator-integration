"use client";

import GoogleTranslateProvider from "@/lib/GoogleTranslateProvider";
import Footer from "@/shared/Footer";
import Navbar from "@/shared/Navbar";

import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="">
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 360px)" }}><GoogleTranslateProvider>{children}</GoogleTranslateProvider></main>
      <Footer />
    </div>
  );
};

export default Layout;
