import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PatientDetails = (props) => {
  const { patientId } = useParams();
  //console.log(patientId)

  const [patients, setPatients] = useState(null);
  const [patientTransactions, setPatientTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3004/hastalar/${patientId}`)
      .then((resPatient) => {
        console.log("Hasta Detaylar", resPatient.data);
        setPatients(resPatient.data);

        axios
          .get("http://localhost:3004/islemler")
          .then((resTransaction) => {
           // console.log("Hasta Detay İşlemler", resTransaction.data);

            //Seçilen hastaya ait işlemlerin tek tek çekilmesine ait algoritma açıklaması
            // 1.si geçici dizi oluşturuldu
            const tempPatientTransactions = [];
            // hastaya ait işlem id lerinin tek tek gezilmesi
            for (let i = 0; i < resPatient.data.transactionsIds.length; i++) {
              //işlemlere ait data içinde arama yap
              const transaction = resTransaction.data.find(
                //id'ye eşit olanları tek tek bul
                (item) => item.id === resPatient.data.transactionsIds[i]
              );
              // geçici olan diziye hastaya ait olan tüm işlemleri tek tek ekle
              tempPatientTransactions.push(transaction);
            }
            console.log("Hastaya Ait İşlem Dataları", tempPatientTransactions);

            setPatientTransactions(tempPatientTransactions);
          })
          .catch((err) => {console.log(err);
          });
      })
      .catch((err) => {console.log(err);
      });
  }, []);

  return (
    <div>
      {patients?.name}
      {patients?.surname}
    </div>
  );
};

export default PatientDetails;
