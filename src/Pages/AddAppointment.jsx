import React from "react";
import Header from "../components/Header";
import AddAppointmentForm from "../components/appointments/AddAppointment-Form";

const HomeP = () => {
  return (
    <div>
      <Header />
      <span>Randevular formu</span>
      <div>
        <div>
        < AddAppointmentForm/>
        </div>
        <div>
          
        </div>
     
      </div>
      
    </div>
  );
};

export default HomeP;

//ilgili poliklinik (doktor) RANDEVULARIN (appointments page) görüntülendiği sayfa
