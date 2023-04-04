import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function RedBar() {
  return (
    <Box
      sx={{
        height: 20,
      }}
    />
  );
}

const PrescriptionModal = (props) => {

  const navigate = useNavigate()
  const { open, handleClose,operation,patientId } = props;
  //console.log("detaylar operation",operation)

  const [treatment,setTreatment]=useState(operation?.treatmentApplied)
  const [prescription,setPrescription]=useState(operation?.prescriptions)


  // "componentDidUpdate" oluşturuldu, (hasta her değiştiğinde güncellensin diye)...
  // dependency olarak tedavi ve reçete map'lediğim operation'su verdim

  useEffect(()=>{
    setTreatment(operation?.treatmentApplied)
    setPrescription(operation?.prescriptions)
  },[operation]);


  const [saveUpdate,setSaveUpdate]=useState(null)

  
  const handleSubmit =(event)=>{
    event.preventDefault()

    /* if(treatment === ""){
      alert("Bütün alanları doldurmanız zorunludur")
      return;
    } */
    
  const updateOperations={
    ...operation,
    treatmentApplied:treatment,
    prescriptions: [prescription]
  }
  axios
      .put(`http://localhost:3004/islemler/${operation?.id}`,updateOperations)
      .then((res)=>{
        //saveUpdate(res.data)
        handleClose()
       
       
      })
      .catch((err)=>{console.log(err)})

  }


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
            style={{ color: "#2cc4cb", fontSize: "15px", textAlign: "center" }}
          >
            REÇETE
          </h1>
    <form onSubmit={handleSubmit}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField sx={{ width: "100%" }} label="Tedavi"
             value={treatment} 
             onChange={(e)=>setTreatment(e.target.value)}/>
            <RedBar />
            <TextField sx={{ width: "100%" }} label="Reçete" 
            value={prescription} 
            onChange={(e)=>setPrescription(e.target.value)}
            />
            <RedBar />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                gap: 1,
              }}
            >
              <Button onClick={handleClose} color="primary" size="small">
                Çıkış
              </Button>
              
              <Button 
              value={saveUpdate}
              onClick={(e)=>setSaveUpdate(e.target.value)} 
              color="secondary" 
              variant="outlined" 
              size="small"
              type="submit"

              >
                Güncelle
              </Button>
             
            </Box>
          </Typography>
          </form>
        </Box>
        
      </Modal>
    </div>
  );
};
export default PrescriptionModal;
