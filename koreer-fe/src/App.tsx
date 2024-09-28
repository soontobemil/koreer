import './App.css';
import {Outlet} from "react-router-dom";
import {Header} from "./components/common/Header";
import React from "react";
import {Footer} from "./components/common/Footer";

function App() {
  return (
      <div className="App">
          <Header />
          <Outlet />
          <Footer />
      </div>
  );
}

export default App;
