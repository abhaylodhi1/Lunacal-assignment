// src/App.jsx
import React from "react";
import Tabs from "./components/Tabs/Tabs";
import Gallery from "./components/Gallery/Gallery";

export default function App() {
  return (
    <div className="min-h-screen flex bg-background text-white py-8 lg:py-16 items-center">
      {/* ================= LEFT SECTION ================= */}
      <div className="hidden lg:flex w-1/2 justify-center items-center pl-0">
        {/* Empty styled box (same size & style as Figma instruction container) */}
        <div className="bg-[#2A2D31] rounded-2xl shadow-lg w-[85%] h-[90vh] border border-[#3a3d42] p-8">
          {/* Empty on purpose */}
        </div>
      </div>

      {/* ================= RIGHT SECTION ================= */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 h-[90vh] px-6 lg:pr-12">
        {/* Tabs Widget */}
        <Tabs />

        {/* Gallery Widget */}
        <Gallery />
      </div>
    </div>
  );
}
