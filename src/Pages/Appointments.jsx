import React from "react";
import Header from "../components/Header";
import DataTable from "../components/appointments/AppointmentData";

const HomeP = () => {
  return (
    <div>
      <Header />
      <span>Randevular sayfası</span>
      <div>
        <div>
        <DataTable />
        </div>
        <div>
          
        </div>
     
      </div>
      
    </div>
  );
};

export default HomeP;

//ilgili poliklinik (doktor) RANDEVULARIN (appointments page) görüntülendiği sayfa
