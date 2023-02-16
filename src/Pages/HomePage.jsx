import React from "react";
import Home from "../components/Home";
import "./style.css";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const HomePage = (props) => {
  return (
    <div className="HomePage">
      <header>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static"
          sx={{
            //navbar 
            //backgroundColor:"#537FE7"
          }}
          >
            <Toolbar>
              <LocalHospitalIcon />

              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <h4>Hospital Automation App</h4>
              </Typography>
              <Button color="inherit"></Button>
            </Toolbar>
          </AppBar>
        </Box>
      </header>
      
      <div className="mainOne">
        <Home />
       
      </div>
    </div>
  );
};

export default HomePage;
