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
import { useContext, useState, useRef, useEffect } from "react";
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

  const productName = useRef<HTMLInputElement>(null);

  const [productPrices, setProductPrices] = useState<{year: string, price: string}[]>([]);
  const productPriceYear = useRef<HTMLInputElement>(null);
  const productPricePrice = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setProductPrices((prev) => [
      ...prev,
      {
        year: productPriceYear.current!.value,
        price: productPricePrice.current!.value,
      },
    ]);
  }, [productPriceYear, productPricePrice]);

  console.log(productPrices);

  const newProduct = {
    productId: productItems!.length + 1,
    productName: productName.current?.value,
    productPrice: [
      {
        year: productPriceYear.current?.value,
        price: productPricePrice.current?.value,
      },
    ],
    productsRequired: [],
  };

 

  return (
    <form method="POST">
      <Stack spacing={2}>
        {/* NAME */}
        <Stack spacing={1} width={"calc(100% - 40px)"}>
          <Typography variant="body1">Product Name</Typography>
          <TextField type="text" required inputRef={productName} />
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
                  inputRef={productPriceYear}
                />
                <TextField
                  label="Price"
                  type="number"
                  InputProps={{ endAdornment: "PLN" }}
                  required
                  inputRef={productPricePrice}
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
