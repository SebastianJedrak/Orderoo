import { Stack, TextField } from "@mui/material";
import { YEARS } from "../ClientView/Order/SelectYear";

export default function FormAddEdit() {
  return (
    <form method="POST">
      <TextField label="Product name" type="text" autoFocus/>
      <Stack direction={"row"}>
      <TextField label="Year" type="number" defaultValue={YEARS[0]}/>
      <TextField label="Price" type="number" InputProps={{endAdornment: "PLN"}} />

      </Stack>
    </form>
  )
}
