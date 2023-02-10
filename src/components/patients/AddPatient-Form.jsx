import React,{useState} from "react";

import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import "./style.css";

function RedBar() {
  return (
    <Box
      sx={{
        height: 20
      }}
    />
  );
}

const AddPatientForm=()=> {

  const [doctor, setDoctor] = useState('');

  const handleChange = (event) => {
    setDoctor(event.target.value);
  };
  return (
    <Box
      sx={{
        marginTop:"40px",
        display: 'flex',
        flexDirection: 'column',
        //border: "1px solid blue",
        alignItems:"center",
        '& .MuiTextField-root': { width: '45ch' },
      }}
    >
      <RedBar />
      <TextField label={"Hasta Adı"} id="margin-none" />
      <RedBar />
      <TextField label={'Hasta Soyadı'} id="margin-none" />
      <RedBar />
      <TextField label={'Telefon Numarası'} id="margin-none" />
      <RedBar />
      {/* selectbar */}
      
      <FormControl sx={{ minWidth: 360 }}
      >
        <InputLabel id="demo-simple-select-label">Doktor</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={doctor}
          label="Doctor"
          onChange={handleChange}
        >
          <MenuItem value={10}>hekim hekim1</MenuItem>
          <MenuItem value={20}>hekim hekim2</MenuItem>
          <MenuItem value={30}>hekim hekim3</MenuItem>
        </Select>
      </FormControl>
      <Box/>
      <Stack sx={{
       marginTop:1,
       
      }}>
      <Button variant="contained" color="info">KAYDET</Button>
      </Stack>
    </Box>
  );
}


export default AddPatientForm;
