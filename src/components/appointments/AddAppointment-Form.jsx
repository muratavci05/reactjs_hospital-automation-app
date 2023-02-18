import * as React from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "./style.css";
import { useState } from "react";
import { useEffect } from "react";

function RedBar() {
  return (
    <Box
      sx={{
        height: 20,
      }}
    />
  );
}

const AppointmentForm = (props) => {
  const [date, setDate] = useState(new Date());
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [discomfort, setDiscomfort] = useState("");
  const [doctor, setDoctor] = useState("");

  const [patients, setPatients] = useState(null);
  const [doctors, setDoctors] = useState(null);

  const [hasPatient, setHasPatient] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3004/hastalar")
      .then((res) => {
        //console.log("Randevular İçinde Hastalar",res.data)
        setPatients(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (patients === null) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(date);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    const searchPatient = patients.find(
      (item) => item.phone === String(event.target.value)
    );
    console.log("aranan hasta", searchPatient);

    if (searchPatient !== undefined) {
      setName(searchPatient.name);
      setSurname(searchPatient.surname);
      setHasPatient(true)
    } 
    
    else {
      setName("")
      setSurname("")
      setHasPatient(false)
      
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="formClass">
          <Stack
            component="form"
            noValidate
            spacing={1}
            sx={{
              margin: 1,
            }}
          >
            <TextField
              className="dateTimeLocal"
              id="datetime-local"
              label="Randevu Tarih & Saati"
              type={"datetime-local"}
              defaultValue={new Date("dd/mm/yyyy")}
              sx={{ width: 300 }}
              InputLabelProps={{
                shrink: true,
              }}
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </Stack>
          <TextField
            type={"number"}
            label={"Telefon Numarası"}
            id="margin-none"
            value={phone}
            onChange={handlePhoneChange}
          />
          <RedBar />
          <TextField
            type={"text"}
            label={"Hasta Adı"}
            id="margin-none"
            value={name}
            onChange={(event) => setName(event.target.value)}
            //kayıtlı ise
            disabled={hasPatient}
          />
          <RedBar />
          <TextField
            type={"text"}
            label={"Hasta Soyadı"}
            id="margin-none"
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
            //kayıtlı ise
            disabled={hasPatient}
          />
          <RedBar />
          <TextField
            type={"text"}
            label={"Hastanın Şikayeti | Rahatsızlığı"}
            id="margin-none"
            value={discomfort}
            onChange={(event) => setDiscomfort(event.target.value)}
          />
          <RedBar />
          <FormControl sx={{ minWidth: 360 }}>
            <InputLabel id="demo-simple-select-label">
              Doktor Seçiniz
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Doctor Seçiniz"
              value={doctor}
              onChange={(event) => setDoctor(event.target.value)}
            >
              {/* {doctors.map((selectDoctor) => {
                return (
                  <MenuItem key={selectDoctor.id} value={selectDoctor.fullname}>
                    {selectDoctor.fullname}
                  </MenuItem>
                );
              })} */}
            </Select>
          </FormControl>

          <Stack
            sx={{
              marginTop: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              sx={{
                width: 100,
              }}
              type="submit"
              variant="contained"
              color="info"
            >
              KAYDET
            </Button>
          </Stack>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
