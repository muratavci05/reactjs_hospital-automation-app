import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPatient from "./Pages/AddPatient";
import HomePage from "./Pages/HomePage";
import Patients from "./Pages/Patients";
import HomeP from "./Pages/Appointments";
import Emergency from "./Pages/Emergency";

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/patients" element={<Patients/>}/>
        <Route path="/add-patient" element={<AddPatient/>}/>
        <Route path="/appointments" element={<HomeP/>}/>
        <Route path="/emergency" element={<Emergency/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
