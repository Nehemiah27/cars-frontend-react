import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AddCar from "./pages/AddCar";
import ViewCarsPage from "./pages/ViewCar";
import "./App.scss";
import { PageTitle } from "./utils/PageTitle";
import WebURL from "./enum/WebURL";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoaderProvider } from "./context/LoaderContext";
import Loader from "./components/Loader";
import CarData from "./pages/CarData";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <LoaderProvider>
        <div className="app-container">
          <Loader />
          <Sidebar isSidebarOpen={isSidebarOpen} />
          <div className={`main-content ${isSidebarOpen ? "" : "shifted"}`}>
            <Header pageTitle={<PageTitle />} toggleSidebar={toggleSidebar} />
            <Routes>
              <Route path={WebURL.HOME_PAGE} element={<ViewCarsPage />} />
              <Route path={WebURL.VIEW_CARS} element={<ViewCarsPage />} />
              <Route path={WebURL.ADD_CARS} element={<AddCar />} />
              <Route path={WebURL.CAR_DATA} element={<CarData />} />
            </Routes>
          </div>
          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </LoaderProvider>
    </Router>
  );
}

export default App;
