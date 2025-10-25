import React, { useState, useRef, useEffect } from "react";
import { HelpCircle } from "lucide-react"; // removed Grid import
import tabsData from "./tabsData";
import TabButton from "./TabButton";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef([]);

  useEffect(() => {
    const activeIndex = tabsData.findIndex((tab) => tab.id === activeTab);
    if (tabsRef.current[activeIndex]) {
      const { offsetLeft, offsetWidth } = tabsRef.current[activeIndex];
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
        transition: "all 0.3s ease-in-out",
      });
    }
  }, [activeTab]);

  return (
    <section className="bg-card rounded-2xl p-3 pr-9 shadow-md relative">
      {/* ? icon - top left */}
      <button className="absolute top-1 left-0.5 p-2 bg-muted rounded-full hover:bg-muted/80 transition">
        <HelpCircle size={24} className="text-question-icon" />
      </button>

      {/* Custom 6-box grid (no border) */}
      <div
        className="absolute left-1 top-1/2 -translate-y-1/2 bg-muted rounded-[1.16px] p-1 flex flex-wrap gap-[2px]"
        style={{
          width: "24px",
          height: "24px",
          opacity: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-grid"
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "1px",
            }}
          ></div>
        ))}
      </div>

      {/* Main content shifted right so icons don’t overlap */}
      <div className="ml-8">
        {/* Tabs bar */}
        <div className="justify-center mb-4">
          <div className="flex justify-center bg-accent rounded-2xl relative px-1">
            <div className="flex overflow-x-auto hide-scrollbar w-full relative z-0">
              {tabsData.map((tab, index) => (
                <div
                  key={tab.id}
                  ref={(el) => (tabsRef.current[index] = el)}
                  className="relative z-10 flex-1 flex justify-center"
                >
                  <TabButton
                    label={tab.label}
                    isActive={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                  />
                </div>
              ))}
              <div
                className="absolute top-1 bottom-1 bg-card rounded-2xl z-0"
                style={indicatorStyle}
              />
            </div>
          </div>
        </div>

        {/* Tab content */}
        <div className="items-center h-40">
          <p className="text-sm text-gray-300 max-w-md text-shadow-text-upper">
            {tabsData.find((tab) => tab.id === activeTab)?.content}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Tabs;
