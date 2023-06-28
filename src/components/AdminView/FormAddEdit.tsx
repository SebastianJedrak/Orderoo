import {
  Autocomplete,
  Box,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { YEARS } from "../ClientView/Order/SelectYear";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useContext, useState } from "react";
import { ProductsContext } from "../../ctx/ProductsContext";

export default function FormAddEdit() {
  const data = useContext(ProductsContext);
  const productItems = data!.productInSelectedYear;

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
      <TextField type="text" autoFocus required/>

      <Typography>Prices</Typography>
      {yearsArr.map((el, i, arr) => (
        <Stack key={i} direction={"row"}>
          <TextField
            label="Year"
            type="number"
            defaultValue={String(el)}
            placeholder=""
            required
          />
          <TextField
            label="Price"
            type="number"
            InputProps={{ endAdornment: "PLN" }}
            required
          />
          {i === arr.length - 1 && i > 0 ? (
            <IconButton
              sx={{ width: "40px", aspectRatio: 1 / 1 }}
              aria-label="add-year"
              onClick={removeYearHandler}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          ) : (
            <Box sx={{ width: "40px", aspectRatio: 1 / 1 }} />
          )}
        </Stack>
      ))}
      <IconButton aria-label="add-year" onClick={addYearHandler}>
        <ControlPointIcon />
      </IconButton>

      <Typography>Required Products</Typography>
      <Autocomplete
        multiple
        id="reqProducts"
        options={productItems!.map((product) => product.productName)}
        renderInput={(params) => <TextField {...params}  />}
      />
    </form>
  );
}
