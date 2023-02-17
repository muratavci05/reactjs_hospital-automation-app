import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import "./style.css";

function RedBar() {
  return (
    <Box
      sx={{
        height: 20,
      }}
    />
  );
}

export default function NativePickers() {
  return (
    <div className="">
      <div className="formClass">
        <Stack
          component="form"
          noValidate
          spacing={1}
          sx={{
            margin: 1,
          }}
        >
          <TextField
            className="dateTimeLocal"
            id="datetime-local"
            label="Randevu Tarih & Saati"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            sx={{ width: 300,

            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Stack>
        <TextField
          type={"number"}
          label={"Telefon Numarası"}
          id="margin-none"
        />
        <RedBar />
        <TextField
          label={"Hasta Adı"}
          id="margin-none"
          
        />
        <RedBar />
        <TextField
          label={"Hasta Soyadı"}
          id="margin-none"
          
        />
        <RedBar />
        <TextField
          label={"Hastanın Şikayeti | Rahatsızlığı"}
          id="margin-none"
          
        />
        <RedBar />

        <Stack
          sx={{
            marginTop: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              width: 100,
            }}
            type="submit"
            variant="contained"
            color="info"
          >
            KAYDET
          </Button>
        </Stack>
      </div>
    </div>
  );
}
