import { Outlet } from "react-router-dom";

import React from "react";
import Header from "../components/Header";

export default function Root() {
  return (
    <div className="h-full">
      <Header />
      <Outlet />
    </div>
  );
}
