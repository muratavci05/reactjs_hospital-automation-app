import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import { useNavigate } from "react-router-dom";
const EmergencyService = () => {

    const navigate=useNavigate();
  return (
    <div>
     
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <LocalHospitalIcon />

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Hospital
            </Typography>
            <Button color="inherit"
            onClick={()=>navigate("/")}
            >
                Anasayfa
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <span>Emergency-Service</span>
    </div>
  );
};

export default EmergencyService;
