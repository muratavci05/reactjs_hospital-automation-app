//hastalar componenti
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import "./style.css";

const PatientDatas = (props) => {
  const [hastalar, setHastalar] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const navigate = useNavigate();

  const [updateComponent, setDidUpdateComponent] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3004/hastalar").then((hastalarRes) => {
      setHastalar(hastalarRes.data);
    });
    axios
      .get("http://localhost:3004/doktorlar")
      .then((res) => {
        setDoctors("doktorlar hastalar", res.data);
      })
      .catch((err) => console.log("hastalar err", err));
  }, [updateComponent]);

  const handleDeletePatient = (hasta) => {
    console.log(hasta);

    axios
      .get(`http://localhost:3004/hastalar/${hasta.id}`)
      .then((DeletePatientResponse) => {
        hasta.transactionsIds.map((islemId) => {
          axios
            .delete(`https://localhost:3004/islemler/${islemId}`)
            .then((islemDeleteRes) => {

            })
            .catch((err => console.log("işlemler silme", err))

      })
      .catch((err) => console.log("hasta silme", err));
  };

  if (hastalar === null || doctors === null) {
    return <h1>Loadign...</h1>;
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <div className="kayitButton">
          <Button
            onClick={() => navigate("/add-patient")}
            variant="outlined"
            color="primary"
          >
            Kayıt
          </Button>
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
                <TableCell>{hasta.doctor}</TableCell>
                <TableCell>
                  <Box sx={{ "& button": { m: 0.1 } }}>
                    <div className="patientsButtons">
                      <Button variant="outlined" size="small">
                        Düzenle
                      </Button>
                      <Button
                        onClick={() => handleDeletePatient(hasta)}
                        variant="outlined"
                        size="small"
                      >
                        Sil
                      </Button>
                      <Button variant="outlined" size="small">
                        Detay
                      </Button>
                    </div>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PatientDatas;
