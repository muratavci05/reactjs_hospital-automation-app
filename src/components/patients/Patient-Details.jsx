import { TransitEnterexit } from "@mui/icons-material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function RedBar() {
  return (
    <Box
      sx={{
        height: 20,
      }}
    />
  );
}

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
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <form >
        <div>
        <Box
          sx={{
            marginTop: "40px",
            marginLeft: "15px",
            "& .MuiTextField-root": { width: "45ch" },
          }}
        >
          <RedBar />
          <TextField label={patients?.name} id="margin-none" disabled />
          <RedBar />
          <TextField label={patients?.surname} id="margin-none" disabled />
          <RedBar />
          <TextField
            type={"number"}
            label={patients?.phone}
            id="margin-none"
            disabled
          />
          <RedBar />
          <TextField label={"Hasta Giriş-acil-randevu vs."} id="margin-none" />
          <RedBar />

          <TextField label={patients?.doctor} id="margin-none" disabled />
          <RedBar />

          <div>
            {patientTransactions.length === 0 ? (
              <p>Hastaya ait işlem bulunmamaktadır</p>
            ) : (
              <div>
                {patientTransactions.map((transaction) => (
                  <div>
                    <p>{transaction.discomfort}</p>
                    <p>
                      {transaction.treatmentApplied === "" ? (
                        <span>Hastaya bir tedavi uygulanmamıştır</span>
                      ) : (
                        <span>{transaction.treatmentApplied}</span>
                      )}{" "}
                    </p>
                    <p>
                      {transaction.prescriptions.length === 0 ? (
                        <span>Hastaya ilaç yazılmamış, reçete yok</span>
                      ) : (
                        <p>
                          {transaction.prescriptions.map((medicament) => (
                            <span>{medicament}</span>
                          ))}
                        </p>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Box>
        </div>
      </form>
    </div>
  );
};

export default PatientDetails;
