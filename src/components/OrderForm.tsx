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
} from "@mui/material";
import { useContext } from "react";
import { ProductsContext } from "../ctx/ProductsContext";

function Products() {
  const data = useContext(ProductsContext);
  const productItems = data?.productItems;

  return (
    <Paper component="section" elevation={3} sx={{ margin: 5, padding: 5 }}>
      
      {/* Header */}
      <Typography variant="h5" gutterBottom textAlign="center">
        Place your order
      </Typography>

      {/* Select year */}
      <FormControl fullWidth>
        <InputLabel
          sx={{ margin: "10px 0" }}
          size="small"
          id="select-year-label"
        >
          Select year
        </InputLabel>
        <Select
          sx={{ width: "150px", margin: "10px 0" }}
          size="small"
          labelId="select-year-label"
          label="Select year"
          id="select-year"
          defaultValue=""
        >
          {productItems?.[0].productPrice.map((year) => (
            <MenuItem key={year.year} value={year.year}>{year.year}</MenuItem>
          ))}
        </Select>

        {/* Checkbox items*/}
        <FormGroup>
          {productItems?.map((product) => (
            <FormControlLabel
              key={product.productId}
              sx={{ width: "max-content" }}
              control={<Checkbox />}
              label={product.productName}
            />
          ))}
        </FormGroup>

        {/* Summary and order*/}
        <Stack spacing={1} display="flex" alignItems="end">
          <Typography variant="h6"> 19$</Typography>
          <Button variant="contained">Order!</Button>
        </Stack>
      </FormControl>
    </Paper>
  );
}

export default Products;
