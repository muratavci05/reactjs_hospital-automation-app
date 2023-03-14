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
import EditPatientModal from "../modal/EditPatientModal";

const PatientDatas = (props) => {
  const [hastalar, setHastalar] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [islemler, setIslemler] = useState(null);
  const [randevular, setRandevular] = useState(null);

  //modal
  const [openEditModal,setOpenEditModal]=useState(false)
  const handleClose = ()=>{
    setOpenEditModal(false)
  };
  //Modal > Düzenlenecek Hasta seçimi
  const [selectedPatient,setSelectedPatient] = useState(null)

  const navigate = useNavigate();

  const [updateComponent, setUpdateComponent] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3004/hastalar").then((hastalarRes) => {
      setHastalar(hastalarRes.data);
    });
    axios.get("http://localhost:3004/doktorlar_dahiliye").then((res) => {
      setDoctors("doktorlar hastalar", res.data);
    });
    axios.get("http://localhost:3004/islemler").then((resIslemler) => {
      setIslemler("islemler", resIslemler.data);
    });
    axios
      .get("http://localhost:3004/randevular")
      .then((resRandevular) => {
        //console.log("randevu",resRandevular)
        setRandevular(resRandevular.data);
      })
      .catch((err) => console.log(err))

      .catch((err) => console.log("hastalar err", err));
  }, [updateComponent]);

  const handleDeletePatient = (hasta) => {
    console.log(hasta);
    //randevuları silmek için
    const filteredRandevular = randevular.filter(
      (item) => item.hastaId === hasta.id
    );
    console.log("filtrelenmiş randevular", filteredRandevular);
    axios
      .delete(`http://localhost:3004/hastalar/${hasta.id}`)
      .then((res) => {
        hasta.transactionsIds.map((islemId) => {
          axios
            .delete(`http://localhost:3004/islemler/${islemId}`)
            .then((IslemDeleteRes) => {console.log("islem silme",IslemDeleteRes)})
            .catch((err) => console.log(err));
           
        });
        filteredRandevular.map(item=>{
          axios.delete(`http://localhost:3004/randevular/${item.id}`)
          .then((res)=>{})
          .catch((err)=>console.log(err))
        })
       //setUpdateComponent(!updateComponent);
      })
      .catch((err) => console.log(err));
      setUpdateComponent(!updateComponent);
  };

  if (
    hastalar === null ||
    doctors === null ||
    islemler === null ||
    randevular === null
  ) {
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
            {hastalar.length === 0 && (
              <TableRow>
                <TableCell align="center" colSpan={4}>
                  Kayıtlı Hasta Bulunmamaktadır
                </TableCell>
              </TableRow>
            )}
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

                     {/* **** Modal **** */}
                      <Button 
                      onClick={()=>{
                        setOpenEditModal(true)
                        setSelectedPatient(hasta)
                      }}
                      variant="outlined" size="small">
                        Düzenle
                      </Button>
                      <Button
                        onClick={() => handleDeletePatient(hasta)}
                        variant="outlined"
                        size="small"
                      >
                        Sil
                      </Button>
                      <Button variant="outlined" size="small"
                      onClick={()=>navigate(`/patient-details/${hasta.id}`)}
                      >
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
      <EditPatientModal 
            updateComponent={updateComponent}
            setUpdateComponent={setUpdateComponent}
            hastalar={hastalar}
            hasta={selectedPatient}
            open={openEditModal}
            handleClose={handleClose}
            />
    </div>
  );
};

export default PatientDatas;