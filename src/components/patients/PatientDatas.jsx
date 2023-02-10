//hastalar componenti
import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';

import "./style.css";

const PatientDatas = (props) => {
  const [hastalar, setHastalar] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3004/hastalar")
      .then((hastalarRes) => {
        setHastalar(hastalarRes.data);
      })
      .catch((err) => console.log("hastalar err", err));
  }, []);

  if (hastalar === null) {
    return <h1>Loadign...</h1>;
  }
  return (
    <div>
      <TableContainer component={Paper}>
            <div className="kayitButton">
            <Button variant="outlined" color="primary">Kayıt</Button>
            </div>
        <Table sx={{ minWidth: 650, marginTop: 2 }} aria-label="simple table">
          <TableHead style={{}}>
            <TableRow style={{ backgroundColor: "#A0CCDA" }}>
              <TableCell>Adı</TableCell>
              <TableCell>Soyadı</TableCell>
              <TableCell>Telefon Numarası</TableCell>
              <TableCell>Doktor</TableCell>
              <TableCell>İşlem</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hastalar.map((hasta) => (
              <TableRow
                key={hasta.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{hasta.name}</TableCell>
                <TableCell>{hasta.surname}</TableCell>
                <TableCell>{hasta.phone}</TableCell>
                <TableCell>doktor ismi</TableCell>
                <TableCell>buraya buton gelecek</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PatientDatas;
