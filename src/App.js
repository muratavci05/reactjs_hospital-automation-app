import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { AddPatient } from "./Pages/AddPatient";
import Home from "./Pages/Home";
import Patients from "./Pages/Patients";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patients" element={<Patients/>}/>
        <Route path="/add-patient" element={<AddPatient/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
