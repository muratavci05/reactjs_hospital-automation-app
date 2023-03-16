import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    secondary: {
      // This is green.A700 as hex.
      main: "#7D9D9C",
    },
    danger: {
      main: "red",
    },
  },
});

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

  const [patients, setPatients] = useState(null);
 // const [policlinic, setPoliclinic] = useState(null);
 // const [doctors, setDoctors] = useState(null);
  const [transactions, setTransactions] = useState(null);
  //const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3004/hastalar/${patientId}`)
      .then((hastalarRes) => {
        setPatients(hastalarRes.data);
        console.log("detaylar >>> hasta", hastalarRes.data);
        axios.get("http://localhost:3004/islemler").then((resIslemler) => {
          setTransactions(resIslemler.data);
          console.log("detaylar İşlemler", resIslemler.data);
          const tempPatientTransaction = [];
          for (let i = 0; i < hastalarRes.data.transactionsIds.length; i++) {
            const operation = resIslemler.data.find(
              (item) => item.id === hastalarRes.data.transactionsIds[i]
            );
            tempPatientTransaction.push(operation);
          }
          console.log("hasta işlem detayları", tempPatientTransaction);
          setTransactions(tempPatientTransaction)
       
          
   
      .catch((err) => console.log(err))
 })
      .catch((err) => console.log("hastalar err", err))
       })
  }, [patientId]);

  return (
    <div style={{ marginLeft: "20px" }}>
      <form>
        <RedBar />
        <div>
          <p
            style={{
              color: "purple",
              marginLeft: "10px",
              marginTop: "10px",
              fontSize: "20px",
            }}
          >
            Hasta Bilgileri
          </p>
        </div>
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
          {/*  <TextField
            label="Poliklinik"
            color="secondary"
            focused
            value="Acil Giriş"
          />
          <TextField
            label="Doktor"
            color="secondary"
            focused
            value={patients?.doctor}
          /> */}
        </Box>

        {/* ---------------------------------------------------------------------------- */}
        {/* ------------------------Buradan sonrası işlemler kısmı---------------------- */}

        <div>
          <p
            style={{
              color: "green",
              marginLeft: "10px",
              marginTop: "10px",
              fontSize: "20px",
            }}
          >
            Hasta İşlemleri
          </p>
        </div>

        <RedBar />
        <div style={{ border: "1px solid blue", display: "contents" }}>
          <ThemeProvider theme={theme}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 0.5, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              {transactions?.length === 0 ? (
                <TextField
                  label="İşlem"
                  color="danger"
                  focused
                  value="hastaya ait işlem bulunmamaktadır"
                />
              ) : (
                <div style={{ width: "100%", position: "absolute" }}>
                  {transactions?.map((operation) => (
                    <div style={{ flexDirection: "-moz-initial" }}>
                      <TextField
                        sx={{ margin: "5px" }}
                        label="Poliklinik"
                        color="secondary"
                        focused
                        value={operation.policlinic || operation.policlinicId}
                      />

                      <TextField
                        sx={{ margin: "5px" }}
                        label="Doktor "
                        color="secondary"
                        focused
                        value={operation.doctor}
                      />
                      <TextField
                        sx={{ margin: "5px" }}
                        label="Rahatsızlık - Şikayet"
                        color="secondary"
                        focused
                        value={operation.discomfort}
                      />

                      {operation.treatmentApplied === "" ? (
                        <TextField
                          sx={{ marginTop: "5px" }}
                          label="Tedavi"
                          color="danger"
                          focused
                          value="Tedavi Uygulanmadı"
                        />
                      ) : (
                        
                         
                            <TextField
                            sx={{ marginTop: "5px", marginLeft: "5px" }}
                              label="Tedavi"
                              color="secondary"
                              focused
                              value={operation.treatmentApplied}
                            />
                         
                        
                      )}

                      {operation.prescriptions.length === 0 ? (
                        <TextField
                          sx={{ marginTop: "5px", marginLeft: "5px" }}
                          label="Reçete"
                          color="danger"
                          focused
                          value="İlaç yazılmadı"
                        />
                      ) : (
                       <>
                          {operation?.prescriptions.map((medicine) => (
                            <TextField
                            sx={{ marginTop: "5px", marginLeft: "5px" }}
                              label="Reçete"
                              color="secondary"
                              focused
                              value={medicine}
                            />
                          ))}
                       </>
                      )}

                      <RedBar />
                      <hr />
                      <RedBar />
                    </div>
                  ))}
                </div>
              )}
            </Box>
          </ThemeProvider>
        </div>
        <RedBar />
        {/* <ThemeProvider theme={theme}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 0.5, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField label="Tarih" color="secondary" focused />
            <TextField label="Poliklinik" color="secondary" focused />
            <TextField label="Doktor " color="secondary" focused />
            <TextField
              label="Rahatsızlık - Şikayet"
              color="secondary"
              focused
            />
            <TextField label="Tedavi" color="secondary" focused />
            <TextField label="Reçete" color="secondary" focused />
            <TextField label="deneme" color="secondary" focused />
          </Box>
        </ThemeProvider> */}
      </form>
    </div>
  );
};

export default PatientDetails;
