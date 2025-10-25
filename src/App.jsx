// src/App.jsx
import React from "react";
import Tabs from "./components/Tabs/Tabs";
import Gallery from "./components/Gallery/Gallery";

export default function App() {
  return (
    <div className="min-h-screen flex bg-background text-white py-8 lg:py-16 items-center">
      <div className="hidden lg:flex w-1/2 justify-center items-center pl-0">
        <div className="bg-left-screen rounded-2xl shadow-lg w-[90%] h-[82vh] border border-left-screen-border p-8"></div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 h-[90vh] px-6 lg:pr-12">
        <Tabs />

        <Gallery />
      </div>
    </div>
  );
}
