import React from "react";
import Header from "../components/Header";
import EmergencyService from "../components/emergency/Header-Emergency";
import AddPatientForm from "../components/patients/AddPatient-Form";


const Emergency = () => {
  return (
    <div>
      <div>
        <EmergencyService />
        <AddPatientForm/>
      </div>
    </div>
  );
};

export default Emergency;
