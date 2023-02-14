import React from "react";
import Header from "../components/Header";
import AddPatientForm from "../components/patients/AddPatient-Form";

const AddPatient = (props) => {
  return (
    <div>
      <Header />
      <AddPatientForm />
    </div>
  );
};

export default AddPatient;
