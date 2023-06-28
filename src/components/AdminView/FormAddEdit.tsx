import { IconButton, Stack, TextField, Typography } from "@mui/material";
import { YEARS } from "../ClientView/Order/SelectYear";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useState } from "react";

export default function FormAddEdit() {
  const [yearsArr, setYearsArr] = useState<number[]>([YEARS[0]]);

  const addYearHandler = () => {setYearsArr((prev => {console.log(prev[-1]); ; return [...prev, prev[-1] + 1]}))};

  return (
    <form method="POST">
      <Typography>Product Name</Typography>
      <TextField type="text" autoFocus />

      <Typography>Prices</Typography>
      {yearsArr.map((el, i) =>     <Stack key={i} direction={"row"}>
      <TextField
        label="Year"
        type="number"
        defaultValue={String(el + i)}
        placeholder=""
      />
      <TextField
        label="Price"
        type="number"
        InputProps={{ endAdornment: "PLN" }}
      />
    </Stack>)}
      <IconButton aria-label="add-year" onClick={addYearHandler}>
        <ControlPointIcon />
      </IconButton>
    </form>
  );
}
