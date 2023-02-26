import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function BasicTable() {

  const navigate = useNavigate();
  const [randevular, setRandevular] = useState(null);
  const [hastalar, setHastalar] = useState(null);
  const [doktorlar, setDoktorlar] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3004/randevular")
      .then((resRandevular) => {
        setRandevular(resRandevular.data);
        axios
          .get("http://localhost:3004/hastalar")
          .then((resHastalar) => {
            setHastalar(resHastalar.data);
            axios
              .get("http://localhost:3004/doktorlar_dahiliye")
              .then((resDoktorlar) => {
                setDoktorlar(resDoktorlar.data);
              })
              .catch((err) => console.log("seçilen doktorlar hata", err));
          })
          .catch((err) => console.log("hastalar hata", err));
      })
      .catch((err) => console.log("Randevular Hata", err));
  }, []);

  

  //seçilen doktor çekimi bu şekilde de oluyor
  /*  useEffect (()=> {
    axios
    .get("http://localhost:3004/doktorlar")
    .then((resDoktorlar) => {
      setDoktorlar(resDoktorlar.data);
    })
    .catch((err) => console.log("seçilen doktorlar hata", err));

  },[]); */

  if (randevular === null || hastalar === null || doktorlar === null) {
    return <h1>Loading...</h1>;
  }
  return (
    <TableContainer component={Paper}>
       <div className="kayitButton">
          <Button
            onClick={() => navigate("/add-appointment-form")}
            variant="outlined"
            color="primary"
          >
            Randevu Oluştur
          </Button>
        </div>
      <Table sx={{ minWidth: 650, marginTop: 2 }} aria-label="simple table">
        <TableHead >
          <TableRow style={{ backgroundColor: "#A0CCDA" }}>
            <TableCell>Tarih</TableCell>
            <TableCell>Adı</TableCell>
            <TableCell>Soyadı</TableCell>
            <TableCell>Telefon Numarası</TableCell>
            <TableCell>Doktor</TableCell>
            <TableCell>İşlem</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {randevular.map((randevu) => {
            const aradigimHasta = hastalar.find(
              (hasta) => hasta.id === randevu.hastaId
            );
            const secilenDoktor = doktorlar.find(
              (doktor) => doktor.fullname === randevu.doctor
            );
            return (
              <TableRow
                key={randevu.id}                
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  
                  {new Date(randevu.date).toLocaleString()}
                </TableCell>

                <TableCell>{aradigimHasta.name}</TableCell>
                <TableCell>{aradigimHasta.surname}</TableCell>
                <TableCell>{aradigimHasta.phone}</TableCell>
                <TableCell>{secilenDoktor.fullname}</TableCell>
                <TableCell>buraya buton gelecek</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
