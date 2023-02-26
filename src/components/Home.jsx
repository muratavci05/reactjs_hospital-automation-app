import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

import "./style.css";

const imageAcil = [
  {
    url: "/assets/acil.jpg",
    titleAcil: "ACİL",
    width: "30%",
  }
];
  const imageCocukAcil = [
  {
    url: "/assets/cocukAcil.jpg",
    titleCocukAcil: "ÇOCUK ACİL",
    width: "30%",
  }
];
const imageKadinDogumAcil = [
  {
    url: "/assets/kdogum.jpg",
    titleKadinDogumAcil: "KADIN-DOĞUM ACİL",
    width: "30%",
  }
];
const imageMuayene = [
  {
    url: "/assets/doc.jpg",
    title: "MUAYENE",
    width: "30%",
  },
  {
    url: '/assets/cocuk.jpg',
    title: 'ÇOCUK',
    width: '30%',
  },
  {
    url: '/assets/kdogumM2.jpg',
    title: 'KADIN-DOĞUM',
    width: '30%',
  }
];

//image button
const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  /* marginTop: 50, */
  marginLeft: 15,
  height: 200,

  //image button responsive
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    marginTop: 5,
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 0,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

export default function ButtonBases() {
  const navigate = useNavigate();
  return (
    <div className="bodyHome">
      <Grid className="gridContainer" container spacing={1}>
        <Box
          className="Box-1"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            minWidth: 300,
            width: "100%",
          }}
        >
          {imageAcil.map((image) => (
            <ImageButton
              focusRipple
              key={image.titleAcil}
              style={{
                width: image.width,
              }}
            >
              <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: "relative",
                    p: 4,
                    pt: 2,

                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                  onClick={() => navigate("/emergency")}
                >
                  {image.titleAcil}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
              
            </ImageButton>
          ))}
          {imageCocukAcil.map((image) => (
            <ImageButton
              focusRipple
              key={image.titleCocukAcil}
              style={{
                width: image.width,
              }}
            >
              <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: "relative",
                    p: 4,
                    pt: 2,

                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                  onClick={() => navigate("/add-patient")}
                >
                  {image.titleCocukAcil}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
              
            </ImageButton>
          ))}
          {imageKadinDogumAcil.map((image) => (
            <ImageButton
              focusRipple
              key={image.titleKadinDogumAcil}
              style={{
                width: image.width,
              }}
            >
              <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: "relative",
                    p: 4,
                    pt: 2,

                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                  onClick={() => navigate("/add-patient")}
                >
                  {image.titleKadinDogumAcil}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
              
            </ImageButton>
          ))}
        </Box>
        <Box
          className="Box-2"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            minWidth: 300,
            width: "100%",
          }}
        >
          {imageMuayene.map((image) => (
            <ImageButton
              focusRipple
              key={image.title}
              style={{
                width: image.width,
              }}
            >
              <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: "relative",

                    p: 4,
                    pt: 2,

                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                  onClick={() => navigate("/add-appointment-form")}
                >
                  {image.title}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          ))}
        </Box>
      </Grid>
    </div>
  );
}
