import {
  Paper,
  FormGroup,
  Button,
  Typography,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  SelectChangeEvent,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../ctx/ProductsContext";
import { OrderType } from "../types";

function Products() {
  const data = useContext(ProductsContext);
  const productItems = data?.productItems;

  // Form control
  const [formValues, setFormValues] = useState<OrderType | null>(null);
  const [isError, setIsError] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2023");
  const [orderedItems, setOrderedItems] = useState<number[] | []>([]);

  const handleChangeYear = (e: SelectChangeEvent) => {
    setSelectedYear(e.target.value as string);
  };

  const handleChangeCheckbox = (
    event: React.SyntheticEvent<Element, Event>
  ) => {
    // Reset error
    if (isError) setIsError(false);

    // Get data
    const target = event.target as HTMLInputElement;
    const targetId = Number(target.value);
    if (target.checked) setOrderedItems([...orderedItems, targetId]);
    if (!target.checked)
      setOrderedItems([...orderedItems].filter((value) => value !== targetId));
  };

  useEffect(
    () => setFormValues({ selectedYear, orderedItems }),
    [selectedYear, orderedItems]
  );

  const submitHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (formValues?.orderedItems.length === 0) return setIsError(true);
    console.log(formValues);
  };

  return (
    <Paper component="section" elevation={3} sx={{ margin: 5, padding: 5 }}>
      {/* Header */}
      <Typography variant="h5" gutterBottom textAlign="center">
        Place Your Order
      </Typography>
      <form>
        {/* Select year */}
        <FormControl fullWidth>
          <InputLabel
            sx={{ margin: "20px 0" }}
            size="small"
            id="select-year-label"
          >
            Select year
          </InputLabel>
          <Select
            sx={{ width: "150px", margin: "20px 0" }}
            size="small"
            labelId="select-year-label"
            label="Select year"
            id="select-year"
            value={selectedYear}
            onChange={handleChangeYear}
          >
            <MenuItem value="2023">2023</MenuItem>
            <MenuItem value="2024">2024</MenuItem>
            <MenuItem value="2025">2025</MenuItem>
          </Select>
        </FormControl>
        {/* Checkbox items*/}
        <FormControl fullWidth error={isError} variant="standard">
          <FormLabel>Choose your items</FormLabel>
          <FormGroup>
            {productItems?.map((product) => (
              <FormControlLabel
                key={product.productId}
                sx={{ width: "max-content" }}
                control={<Checkbox />}
                label={product.productName}
                value={product.productId}
                onChange={handleChangeCheckbox}
              />
            ))}
          </FormGroup>
          <FormHelperText
            sx={{ visibility: `${isError ? "visible" : "hidden"}` }}
          >
            You need to choose minimum one item to order
          </FormHelperText>
        </FormControl>
        {/* Summary and order*/}
        <Stack spacing={1} display="flex" alignItems="end">
          <Typography variant="h6"> 19$</Typography>
          <Button onClick={submitHandler} type="submit" variant="contained">
            Order!
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default Products;
