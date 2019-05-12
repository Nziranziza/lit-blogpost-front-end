import React from "react";
import { HashRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";
import Routes from "./Routes";

const App = () => (
  <Router>
    <Navbar />
    <Routes />
  </Router>
);

export default App;
