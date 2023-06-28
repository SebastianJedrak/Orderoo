import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import { YEARS } from "../ClientView/Order/SelectYear";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useState } from "react";

export default function FormAddEdit() {
  const [yearsArr, setYearsArr] = useState<number[]>([YEARS[0]]);

  const addYearHandler = () => {
    setYearsArr((prev) => [...prev, prev.at(-1)! + 1]);
  };

  const removeYearHandler = () => {
    setYearsArr((prev) => prev.slice(0, -1));
  };
  
  return (
    <form method="POST">
      <Typography>Product Name</Typography>
      <TextField type="text" autoFocus />

      <Typography>Prices</Typography>
      {yearsArr.map((el, i, arr) => (
        <Stack key={i} direction={"row"}>
          <TextField
            label="Year"
            type="number"
            defaultValue={String(el)}
            placeholder=""
          />
          <TextField
            label="Price"
            type="number"
            InputProps={{ endAdornment: "PLN" }}
          />
          {i === arr.length - 1 && i > 0 ? (
            <IconButton
              sx={{ width: "40px", aspectRatio: 1 / 1 }}
              aria-label="add-year"
              onClick={removeYearHandler}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          ) : <Box sx={{ width: "40px", aspectRatio: 1 / 1 }}/>}
        </Stack>
      ))}
      <IconButton aria-label="add-year" onClick={addYearHandler}>
        <ControlPointIcon />
      </IconButton>
    </form>
  );
}
