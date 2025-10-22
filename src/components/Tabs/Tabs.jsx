import React, { useState, useRef, useEffect } from "react";
import tabsData from "./tabsData";
import TabButton from "./TabButton";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef([]);

  useEffect(() => {
    const activeIndex = tabsData.findIndex(tab => tab.id === activeTab);
    if (tabsRef.current[activeIndex]) {
      const { offsetLeft, offsetWidth } = tabsRef.current[activeIndex];
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
        transition: "all 0.3s ease-in-out"
      });
    }
  }, [activeTab]);

  return (
    <section className="bg-card rounded-2xl p-6 shadow-md">
      {/* Tab buttons with sliding indicator */}
      <div className="justify-center mb-4">
        <div className="flex justify-center bg-accent rounded-2xl relative px-1 ">
          <div className="flex overflow-x-auto hide-scrollbar w-full relative z-0">
            {tabsData.map((tab, index) => (
              <div 
                key={tab.id}
                ref={el => tabsRef.current[index] = el}
                className="relative z-10 flex-1 flex justify-center"
              >
                <TabButton
                  label={tab.label}
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                />
              </div>
            ))}
            {/* Sliding indicator - edge to edge */}
            <div 
              className="absolute top-1 bottom-1 bg-card rounded-2xl z-0"
              style={indicatorStyle}
            />
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="flex items-center justify-center h-40 text-center">
        <p className="text-sm text-gray-300 leading-relaxed max-w-md">
          {tabsData.find((tab) => tab.id === activeTab)?.content}
        </p>
      </div>
    </section>
  );
};

export default Tabs;