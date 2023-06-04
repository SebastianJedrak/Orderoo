import {
  Paper,
  FormGroup,
  Button,
  Typography,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import products from "../../data/products.json";
import ProductItem from "./ProductItem";

function Products() {
  const productsItems = products.productItems;
  return (
    <Paper component="section" elevation={3} sx={{ margin: 5, padding: 5 }}>
      {/* Header */}
      <Typography variant="h5" gutterBottom textAlign="center">
        Place your order
      </Typography>

      {/* Select year */}
      <Select fullWidth label="select country">
        {Object.keys(productsItems[0].productPrice).map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>

      {/* Checkbox items*/}
      <FormGroup>
        {productsItems.map((product) => (
          <ProductItem key={product.productId} productItem={product} />
        ))}
      </FormGroup>

      {/* Summary and order*/}
      <Stack spacing={1} display="flex" alignItems="end">
        <Typography variant="h6"> 19$</Typography>
        <Button variant="contained">Order!</Button>
      </Stack>
    </Paper>
  );
}

export default Products;
