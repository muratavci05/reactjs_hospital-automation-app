import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function RedBar() {
  return (
    <Box
      sx={{
        height: 20,
      }}
    />
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditPatientModal = (props) => {
  const {
    open,
    handleClose,
    hasta,
    hastalar,
    updateComponent,
    setUpdateComponent,
  } = props;
  const navigate = useNavigate();

  const [name, setName] = useState(hasta?.name);
  const [surname, setSurname] = useState(hasta?.surname);
  const [phone, setPhone] = useState(hasta?.phone);

  //Edit Modal Eksik, hatalı giriş olduğunda alert uyarısı yerine modal'da uyarı çıkması için
  const [hasNameError, setHasNameError] = useState(false);
  const [hasSurnameError, setHasSurnameError] = useState(false);
  const [hasPhoneError, setHasPhoneError] = useState(false);
  const [phoneDigitErrorMessage, setPhoneDigitErrorMessage] = useState(false);

  useEffect(() => {
    setName(hasta?.name);
    setSurname(hasta?.surname);
    setPhone(hasta?.phone);
  }, [hasta]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Alert Uyarısı için kullanılan validation yapısı
    /* if (name === "" || surname === "" || phone === "" ) {
        alert("Hasta Bilgilerini Eksiksiz Doldurunuz"); */

    // Modal üzerinde uyarı çıkması için oluşturulan validation (tek tek olmalı)
    if (name === "") {
      setHasNameError(true);

      // çıkan uyarı 2 sn. ekranda çıkıp geri kaybolacak
      setTimeout(() => {
        setHasNameError(false);
      }, 2000);
      return;
    }
    if (surname === "") {
      setHasSurnameError(true);

      // çıkan uyarı 2 sn. ekranda çıkıp geri kaybolacak
      setTimeout(() => {
        setHasSurnameError(false);
      }, 2000);
      return;
    }

    if (phone === "") {
      setHasPhoneError(true);
      setPhoneDigitErrorMessage("* Telefon Nurasını Girmek Zorunludur");
      setTimeout(() => {
        setHasPhoneError(false);
        setPhoneDigitErrorMessage("");
      }, 2000);
      return;
    }

    if (phone.length !== 11) {
      /*  alert("Telefon Numarası 11 Haneli Olmalıdır");
        return; */
      setHasPhoneError(true);
      setPhoneDigitErrorMessage("* Telefon Numarası 11 haneli Olmalıdır");
      // çıkan uyarı 2 sn. ekranda çıkıp geri kaybolacak
      setTimeout(() => {
        setHasPhoneError(false);
        setPhoneDigitErrorMessage("");
      }, 2000);
      return;
    }
    //console.log("yeni hasta", newPatient);

    //edit içinde hasta telefon numarasının isim yada soyisim değişikliğinde kaydetmeyi engellemesi için
    const filteredPatients = hastalar.filter(
      (item) => item.phone !== hasta.phone
    );

    //aynı telefon numarasına ait olan hastanın tekrardan kayıt altına alınmaması için
    const hasNumber = filteredPatients.find((hasta) => hasta.phone === phone);
    if (hasNumber !== undefined) {
      alert("Bu Telefon Numarasına Ait Hasta Kaydı Bulunmaktadır!");
      return;
    }

    // edit işleminin set olması için
    const updatePatient = {
      ...hasta,
      name: name,
      surname: surname,
      phone: phone,
    };
    //console.log("update Patient", updatePatient)

    axios
      .put(`http://localhost:3004/hastalar/${hasta.id}`, updatePatient)
      .then((res) => {
        handleClose();
        setUpdateComponent(!updateComponent);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1
            style={{ color: "#2cc4cb", fontSize: "24px", textAlign: "center" }}
          >
            Hasta Düzenle
          </h1>
          <RedBar />
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ width: "100%" }}
              label={"Hasta Adı"}
              id="margin-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {hasNameError && (
              <p
                style={{
                  color: "orangered",
                  fontSize: "12px",
                }}
              >
                * Hasta Adını Girmek Zorunludur!
              </p>
            )}
            <RedBar />
            <TextField
              sx={{ width: "100%" }}
              label={"Hasta Soyadı"}
              id="margin-none"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            {hasSurnameError && (
              <p
                style={{
                  color: "orangered",
                  fontSize: "12px",
                }}
              >
                * Hasta Soyadını Girmek Zorunludur!
              </p>
            )}

            <RedBar />
            <TextField
              sx={{ width: "100%" }}
              type={"number"}
              label={"Telefon Numarası"}
              id="margin-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {hasPhoneError && (
              <p
                style={{
                  color: "orangered",
                  fontSize: "12px",
                }}
              >
                {phoneDigitErrorMessage}
              </p>
            )}
            <RedBar />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                gap: 5,
              }}
            >
              <Button onClick={handleClose} variant="outlined" color="error">
                Vazgeç
              </Button>

              <Button
                sx={{ gap: 10 }}
                type="submit"
                variant="contained"
                color="info"
              >
                KAYDET
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default EditPatientModal;
