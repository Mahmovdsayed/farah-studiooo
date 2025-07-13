"use client";

import React from "react";

interface Iprops {
  children: React.ReactNode;
}

const ContainerLayout = ({ children }: Iprops) => {
  return (
    <>
      <main className="min-h-dvh overflow-x-hidden">
        <div className="container mx-auto px-4 py-6">{children}</div>
      </main>
    </>
  );
};
export default ContainerLayout;
