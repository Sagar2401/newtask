import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { Route, Routes } from "react-router-dom";
import ContactList from "./Pages/ContactList/ContactList";
import Contact from "./Model/Contact";
import { getContactList } from "./store/contactSlice";
import { useAppSelector } from "./store/hooks";
import Chart from "./Pages/Chart/Chart";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="gs-inner-main-wrapper">
        <Sidebar />
        <div className="gs-content-footer-wrapper">
          <div className="gs-content-wrapper">
            <Routes>
              <Route path="/" element={<ContactList />} />
              <Route path="/chart" element={<Chart />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
