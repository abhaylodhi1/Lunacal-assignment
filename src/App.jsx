import React from "react";
import Tabs from "./components/Tabs/Tabs";
import Gallery from "./components/Gallery/Gallery";

export default function App() {
  return (
    <div className="min-h-screen flex bg-background text-white py-8 lg:py-16 items-center relative overflow-hidden">
   
      <div className="hidden lg:flex w-1/2 justify-center items-center pl-0">
        <div className="bg-left-screen rounded-2xl shadow-lg w-[90%] h-[82vh] border border-left-screen-border p-8"></div>
      </div>


      <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 h-[90vh] px-6 lg:pr-12 relative">
     
        <div className="absolute left-[5vw] right-[7vw] top-[49%] border-t-[3px] border-line opacity-80"></div>

        <Tabs />

   
        <div className="relative">
          <Gallery />
        
          <div className="absolute left-[3vw] right-[4vw] bottom-[-20px] border-t-[3px] border-line opacity-80"></div>
        </div>
      </div>
    </div>
  );
}
