import React from "react";

const TabButton = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-3 font-medium transition-all duration-300 relative z-10 w-full ${
        isActive
          ? "text-white"
          : "text-gray-400 hover:text-white hover:bg-accent/40"
      }`}
    >
      {label}
    </button>
  );
};

export default TabButton;