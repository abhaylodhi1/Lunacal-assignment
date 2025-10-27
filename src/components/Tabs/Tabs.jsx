import React, { useState, useRef, useEffect } from "react";
import { HelpCircle } from "lucide-react";
import tabsData from "./tabsData";
import TabButton from "./TabButton";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef([]);
  const scrollRef = useRef(null);

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
   
      <button className="absolute top-1 left-0.5 p-2 bg-muted rounded-full hover:bg-muted/80 transition">
        <HelpCircle size={24} className="text-question-icon" />
      </button>

   
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
          />
        ))}
      </div>

      <div className="ml-8">
        <div className="justify-center mb-4">
          <div className="flex justify-center bg-accent rounded-2xl relative px-1">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto hide-scrollbar w-full relative z-0"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
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
                className="absolute top-1 bottom-1 bg-slider rounded-2xl z-0"
                style={indicatorStyle}
              />

              <div className="absolute top-0 right-0 w-px h-full z-20 pointer-events-none" />
            </div>
          </div>
        </div>

      
        <div className="h-40 overflow-y-auto relative scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          <div className="h-[320%] pr-2">
            <p className="text-sm  text-text-upper">
              {tabsData.find((tab) => tab.id === activeTab)?.content}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        /* Hide horizontal scrollbar */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Vertical scrollbar width */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        /* Gradient vertical scrollbar thumb */
        .scrollbar-thumb-gray-400::-webkit-scrollbar-thumb {
          border-radius: 3px;
          background: linear-gradient(180deg, #888989 0%, #4A4E54 100%);
        }

        /* Transparent track */
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }

        /* Hide buttons and corners */
        .scrollbar-thin::-webkit-scrollbar-button {
          display: none;
        }
        .scrollbar-thin::-webkit-scrollbar-corner {
          background: transparent;
        }
      `}</style>
    </section>
  );
};

export default Tabs;
