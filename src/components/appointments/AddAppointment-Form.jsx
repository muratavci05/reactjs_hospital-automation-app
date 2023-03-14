import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Button, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";

import InputLabel from "@mui/material/InputLabel";
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

const AppointmentForm = (props) => {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [discomfort, setDiscomfort] = useState("");
  const [doctor, setDoctor] = useState("");
  const [policlinic,setPoliclinic]= useState("")

  const [patients, setPatients] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [policlinics,setPoliclinics]=useState(null)

  const [hasPatient, setHasPatient] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3004/hastalar")
      .then((res) => {
        //console.log("Randevular İçinde Hastalar",res.data)
        setPatients(res.data);
        axios
          .get("http://localhost:3004/doktorlar_dahiliye")
          .then((resDoctors) => {
            //console.log("listDoctor",resDoctors)
            setDoctors(resDoctors.data);
          })
          axios
            .get("http://localhost:3004/dahiliye_poliknilik")
            .then((resPoliclinic)=>{
              //console.log("poliklinikler",resPoliclinic.data)
              setPoliclinics(resPoliclinic.data)
            })
            .catch((err)=>{console.log(err)})
          .catch((err) => console.log(err));
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (patients === null || doctors === null || policlinics === null) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      date === "" ||
      phone === "" ||
      name === "" ||
      surname === "" ||
      discomfort === "" ||
      doctor === "" ||
      policlinic === ""
    ) {
      alert("Bütün Alanları Girmek Zorunludur");
      return;
    }

    if (phone.length !== 11) {
      alert("Telefon Numarasını 11 Haneli Girmeniz Gerekiyor");
    }

    if (hasPatient) {
      const newAppointment = {
        id: String(new Date().getTime()),
        date: date,
        hastaId: hasPatient.id,
        policlinic:policlinic,
        doctor: doctor,
      };

      const newTransaction = {
        id: String(new Date().getTime() + 1),
        discomfort: discomfort,
        treatmentApplied: "",
        policlinic:policlinic,
        doctor:doctor,
        prescriptions: [],
       
      };

      const updatePatient = {
        ...hasPatient,
        transactionsIds: [...hasPatient.transactionsIds, newTransaction.id],
      };
      axios
        .post("http://localhost:3004/randevular", newAppointment)
        .then((res) => {
          //console.log("randevu kayıt", res);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .post("http://localhost:3004/islemler", newTransaction)
        .then((res) => {
         console.log("randevu işlemler kayıt", res);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .put(`http://localhost:3004/hastalar/${hasPatient.id}`, updatePatient)
        .then((res) => {
          console.log("güncellenmiş randevulu hasta", res);
        })
        .catch((err) => {
          console.log(err);
        });

      navigate("/appointments");
    } else {
      const newTransaction = {
        id: String(new Date().getTime()),
        discomfort: discomfort,
        policlinic:policlinic,
        doctor:doctor,
        treatmentApplied: "",
        prescriptions: [],
      };

      const newPatient = {
        id: String(new Date().getTime() + 1),
        name: name,
        surname: surname,
        phone: phone,
        policlinic:policlinic,
        doctor: doctor,
        transactionsIds: [newTransaction.id],
       
      };

      const newAppointment = {
        id: String(new Date().getTime() + 2),
        date: date,
        hastaId: newPatient.id,
        policlinic:policlinic,
        doctor: doctor,
      };

      axios.post("http://localhost:3004/hastalar", newPatient).then((res) => {
        console.log("Randevu'dan Yeni Hasta Kaydı", res);
      });
      axios
        .post("http://localhost:3004/randevular", newAppointment)
        .then((res) => {
          console.log("Yeni Hastaya yeni Randevu Oluşturma", res);
        })
        .catch((err) => {
          console.log("Yeni Hastaya Yeni Randevu Oluşturma Hata", err);
        });
      axios
        .post("http://localhost:3004/islemler", newTransaction)
        .then((res) => {
          console.log("Yeni Randevulu Yeni Hastann İşlemi", res);
        })
        .catch((err) => {
          console.log("Yeni Randevuu Yeni Hastanın İşlem Hatası", err);
        })

        .catch((err) => {
          console.log("Randevulu Yeni Hasta Kaydı Hata", err);
        });
      navigate("/appointments");
    }
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
      setHasPatient(searchPatient);
    } else {
      setName("");
      setSurname("");
      setHasPatient(false);
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
              Poliklinik Seçiniz
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Doctor Seçiniz"
              value={policlinic}
              onChange={(event) => setPoliclinic(event.target.value)}
            >
              {policlinics.map((selectPoliclinic) => {
                return (
                  <MenuItem key={selectPoliclinic.id} value={selectPoliclinic.policlinicTitle}>
                    {selectPoliclinic.policlinicTitle}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
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
              {doctors.map((selectDoctor) => {
                return (
                  <MenuItem key={selectDoctor.id} value={selectDoctor.fullname}>
                    {selectDoctor.fullname}
                  </MenuItem>
                );
              })}
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
