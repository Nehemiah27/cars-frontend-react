import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AddCarPage from "./pages/AddCar";
import ViewCarsPage from "./pages/ViewCar";
import "./App.scss";
import { PageTitle } from "./utils/PageTitle";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <div className="app-container">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className={`main-content ${isSidebarOpen ? "" : "shifted"}`}>
          <Header pageTitle={<PageTitle />} toggleSidebar={toggleSidebar} />
          <Routes>
            <Route path="/" element={<ViewCarsPage />} />
            <Route path="/view-cars" element={<ViewCarsPage />} />
            <Route path="/add-car" element={<AddCarPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
