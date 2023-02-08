import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
//import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Header = (props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <LocalHospitalIcon
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr:0 }}
          >
            <MenuIcon />
          </LocalHospitalIcon>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <span /* style={{fontSize:"25px"}} */>H</span>ospital
          </Typography>
          <Button color="inherit">Buton1</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Header;
