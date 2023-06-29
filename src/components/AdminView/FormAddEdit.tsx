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

  const [productName, setProductName] = useState("");
  const productNameHandler = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setProductName(target.value)
  };

  const [productPriceYear, setProductYear] = useState<string[]>([]);
  const productYearHandler = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    console.log(target.value);
    setProductYear((prev) => [...prev, target.value])
  };
  console.log(productPriceYear);


  return (
    <form method="POST">
      <Stack spacing={2}>
        {/* NAME */}
        <Stack spacing={1} width={"calc(100% - 40px)"}>
          <Typography variant="body1">Product Name</Typography>
          <TextField type="text" required onChange={productNameHandler} />
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
                  onChange={productYearHandler}
                />
                <TextField
                  label="Price"
                  type="number"
                  InputProps={{ endAdornment: "PLN" }}
                  required
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
      </Stack>
    </form>
  );
}
