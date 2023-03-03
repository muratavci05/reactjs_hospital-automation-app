import { TransitEnterexit } from "@mui/icons-material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

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
    <React.Fragment>
      <form>
        <RedBar />
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Hasta İsim"
            color="secondary"
            focused
            value={patients?.name}
          />
          <TextField
            label="Hasta Soyİsim"
            color="secondary"
            focused
            value={patients?.surname}
          />
          <TextField
            label="Hasta Telefon "
            color="secondary"
            focused
            value={patients?.phone}
          />
          <TextField
            label="Hasta Giriş - Acil Randevu"
            color="secondary"
            focused
          />
          <TextField
            label="Doktor"
            color="secondary"
            focused
            value={patients?.doctor}
          />
        </Box>
        <div>
          {/* ---------------ayrıldı---------------- */}
          <p>İşlemler</p>
          {/* bitiş */}
        </div>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "50ch", display:"flex",justifyContent:"space-evenly" },
          }}
          noValidate
          autoComplete="off"
          >
          {patientTransactions.length === 0 ? (
            <p style={{ color: "red" }}>
              {" "}
              *** Hastaya ait işlem bulunmamaktadır
            </p>
          ) : (
            <Box>
              {patientTransactions.map((transaction) => (
                <Box
                
                >
                  <TextField
                    label="Hasta Şikayeti"
                    variant="filled"
                    color="success"
                    value={transaction.discomfort}
                    focused
                    
                  />

                  <Typography>
                    {transaction.treatmentApplied === "" ? (
                      <span style={{ color: "red" }}>
                        {" "}
                        * Hastaya bir tedavi uygulanmamıştır
                      </span>
                    ) : (
                      <Box>
                        <TextField
                          label="Muayene şekli"
                          variant="filled"
                          color="success"
                          value={transaction.treatmentApplied}
                          focused
                          
                        />
                      </Box>
                    )}{" "}
                  </Typography>
                  <Typography>
                    {transaction.prescriptions.length === 0 ? (
                      <span>Hastaya ilaç yazılmamış, reçete yok</span>
                    ) : (
                      <Typography
                      
                      >
                        {transaction.prescriptions.map((medicament) => (
                          <Box 
                         
                          >
                            <TextField
                              label="Reçete (ilaç vs)"
                              variant="filled"
                              color="success"
                              value={medicament}
                              focused

                             
                            />

                           
                            
                          </Box>
                        ))}
                      </Typography>
                    )}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>

       
        <RedBar />
      </form>
    </React.Fragment>
  );
};

export default PatientDetails;
