import React from "react";
import { Nav } from "./Nav";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-8 py-16">
      <main className="max-w-screen-xl xs:w-[90%] mx-auto">
        <Nav />
        {children}
      </main>
    </div>
  );
};
