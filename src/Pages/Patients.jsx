import React from "react";
import Header from "../components/Header";
import PatientDatas from "../components/patients/patientDatas";

const Patients = () => {
  return (
    <div>
      <Header />
      <span>hastalar sayfası</span>
      <PatientDatas />
    </div>
  );
};

export default Patients;
