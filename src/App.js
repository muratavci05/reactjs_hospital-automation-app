import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Pages/Home";
import Patients from "./Pages/Patients";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patients" element={<Patients/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
