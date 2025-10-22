import React, { useState } from "react";
import tabsData from "./tabsData";
import TabButton from "./TabButton";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <section className="bg-card rounded-2xl p-6 shadow-md">
      {/* Tab buttons */}
      <div className="flex gap-2 mb-4 border-b border-accent/40 pb-2 overflow-x-auto hide-scrollbar">
        {tabsData.map((tab) => (
          <TabButton
            key={tab.id}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-4 text-sm text-gray-300 leading-relaxed">
        {tabsData.find((tab) => tab.id === activeTab)?.content}
      </div>
    </section>
  );
};

export default Tabs;
