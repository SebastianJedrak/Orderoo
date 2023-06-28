import {
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { YEARS } from "../ClientView/Order/SelectYear";
import ControlPointIcon from "@mui/icons-material/ControlPoint";


export default function FormAddEdit() {
  return (
    <form method="POST">
        <Typography>Product Name</Typography>
        <TextField type="text" autoFocus />

        <Typography>Prices</Typography>
        <Stack direction={"row"}>
          <TextField
            label="Year"
            type="number"
            defaultValue={YEARS[0]}
            placeholder=""
          />
          <TextField
            label="Price"
            type="number"
            InputProps={{ endAdornment: "PLN" }}
          />
        </Stack>
        <IconButton  aria-label="add-year"> <ControlPointIcon /></IconButton>
    </form>
  );
}
