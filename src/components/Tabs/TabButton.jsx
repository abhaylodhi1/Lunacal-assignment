import React from "react";

const TabButton = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-medium transition ${
        isActive
          ? "bg-accent text-white shadow-sm"
          : "text-gray-400 hover:text-white hover:bg-accent/40"
      }`}
    >
      {label}
    </button>
  );
};

export default TabButton;
