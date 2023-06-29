import {
  Autocomplete,
  Box,
  IconButton,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { YEARS } from "../ClientView/Order/SelectYear";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useContext, useState, useRef, useEffect, ChangeEvent } from "react";
import { ProductsContext } from "../../ctx/ProductsContext";
import { ProductsType } from "../../types";

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





const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  console.log(e.currentTarget.productName.value);
  console.log(e.currentTarget.productYear1.value);

}

  return (
    <form method="POST" onSubmit={submitHandler}>
      <Stack spacing={2}>
        {/* NAME */}
        <Stack spacing={1} width={"calc(100% - 40px)"}>
          <Typography variant="body1">Product Name</Typography>
          <TextField type="text" required  name="productName"/>
        </Stack>

        {/* Prices */}
        <Stack spacing={1}>
          <Typography variant="body1">Prices</Typography>
          <Stack spacing={1} alignItems={"center"}>
            {yearsArr.map((el, i, arr) => (
              <Stack key={i} direction={"row"} alignItems={"center"}>
                <TextField
                  label="Year"
                  type="number"
                  defaultValue={String(el)}
                  placeholder=""
                  required
                  name={`productYear${i}`}
                />
                <TextField
                  label="Price"
                  type="number"
                  InputProps={{ endAdornment: "PLN" }}
                  required
                  name={`productPrice${i}`}
                />
                {i === arr.length - 1 && i > 0 ? (
                  <IconButton
                    sx={{ width: "40px", height: "40px" }}
                    aria-label="add-year"
                    onClick={removeYearHandler}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                ) : (
                  <Box sx={{ width: "40px", height: "40px" }} />
                )}
              </Stack>
            ))}
            <IconButton
              sx={{ width: "40px" }}
              aria-label="add-year"
              onClick={addYearHandler}
            >
              <ControlPointIcon />
            </IconButton>
          </Stack>
        </Stack>

        {/* REQ */}
        <Stack spacing={1} width={"calc(100% - 40px)"}>
          <Typography variant="body1" gutterBottom>
            Required Products
          </Typography>
          <Autocomplete
            multiple
            id="reqProducts"
            options={productItems!.map((product) => product.productName)}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
        <button type="submit">submit</button>
      </Stack>
    </form>
  );
}
