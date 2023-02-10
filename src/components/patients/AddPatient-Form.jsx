import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "./style.css";

function RedBar() {
  return (
    <Box
      sx={{
        height: 20,
      }}
    />
  );
}

const AddPatientForm = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [doctor, setDoctor] = useState("");

  const navigate = useNavigate();

  //Doktor listesi çekmek için kullanılan state
  const [doctors, setDoctors] = useState(null);

  useEffect(() => {
    axios
      .get("  http://localhost:3004/doktorlar")
      .then((resDoctors) => {
        //console.log("listDoctor",resDoctors)
        setDoctors(resDoctors.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name === "" || surname === "" || phone === "" || doctor === "") {
      alert("Hasta Bilgilerini Eksiksiz Doldurunuz");
      return;
    }

    const newPatient = {
      id: new Date().getTime(),
      name: name,
      surname: surname,
      phone: phone,
      doctor: doctor,
    };
    //console.log("yeni hasta", newPatient);

    //yeni hasta kaydını veritabanına kaydetme
    axios
      .post("http://localhost:3004/hastalar/", newPatient)
      .then((res) => {
        console.log("new patients", res);
        setName("");
        setSurname("");
        setPhone("");
        setDoctor("");
        navigate("/patients");
      })
      .catch((err) => console.log(err));

    /*  console.log("adı",name)
    console.log("soyadı",surname)
    console.log("telefon",phone)
    console.log("doktor adı",doctor) */
  };

  if (doctors === null) {
    return <h1>Loading...</h1>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          marginTop: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& .MuiTextField-root": { width: "45ch" },
        }}
      >
        <RedBar />
        <TextField
          label={"Hasta Adı"}
          id="margin-none"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <RedBar />
        <TextField
          label={"Hasta Soyadı"}
          id="margin-none"
          value={surname}
          onChange={(event) => setSurname(event.target.value)}
        />
        <RedBar />
        <TextField
          label={"Telefon Numarası"}
          id="margin-none"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        <RedBar />
        {/* selectbar */}

        <FormControl sx={{ minWidth: 360 }}>
          <InputLabel id="demo-simple-select-label">Doktor Seçiniz</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Doctor Seçiniz"
            value={doctor}
            onChange={(event) => setDoctor(event.target.value)}
          >
            {doctors.map((selectDoctor) => {
              return (
                <MenuItem value={selectDoctor.fullname}>
                  {selectDoctor.fullname}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Box />
        <Stack
          sx={{
            marginTop: 1,
          }}
        >
          <Button type="submit" variant="contained" color="info">
            KAYDET
          </Button>
        </Stack>
      </Box>
    </form>
  );
};

export default AddPatientForm;
