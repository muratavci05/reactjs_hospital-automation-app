import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
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
          })
          .catch((err) => console.log("hastalar hata", err));
      })
      .catch((err) => console.log("Randevular Hata", err));
  },[]);

  //seçilen doktor çekimi
  useEffect (()=> {
    axios
    .get("http://localhost:3004/doktorlar")
    .then((resDoktorlar) => {
      setDoktorlar(resDoktorlar.data);
    })
    .catch((err) => console.log("seçilen doktorlar hata", err));

  },[]);

  if (randevular === null || hastalar === null) {
    return <h1>Loading...</h1>;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, marginTop: 2 }} aria-label="simple table">
        <TableHead style={{}}>
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
              (doctor) => doctor.id === randevu.doctorId
            );
            return (
              <TableRow
                key={randevu.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {randevu.date}
                </TableCell>

                <TableCell>{aradigimHasta.name}</TableCell>
                <TableCell>{aradigimHasta.surname}</TableCell>
                <TableCell>{aradigimHasta.phone}</TableCell>
                <TableCell>{secilenDoktor.doktorsurname}</TableCell>
                <TableCell>buraya buton gelecek</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
