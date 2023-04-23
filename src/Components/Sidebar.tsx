import { useNavigate } from "react-router-dom";
import React from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  // const active = window.location.pathname.includes("chart") ? "active" : "";

  return (
    <div className="bg-gray-500 sidebar">
      <div
        className={window.location.pathname.includes("chart") ? "" : "active"}
        onClick={() => {
          navigate(`/`);
        }}
      >
        Contact
      </div>
      <div
        className={window.location.pathname.includes("chart") ? "active" : ""}
        onClick={() => {
          navigate(`/chart`);
        }}
      >
        Chart
      </div>
    </div>
  );
};

export default Sidebar;
