import {
  Paper,
  FormGroup,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import products from "../../data/products.json";
import ProductItem from "./ProductItem";

function Products() {
  const productsItems = products.productItems;
  return (
    <Paper component="section" elevation={3} sx={{ margin: 5, padding: 5 }}>
      <Typography variant="h5" gutterBottom textAlign="center">Place your order</Typography>
      <FormGroup>
        {productsItems.map((product) => (
          <ProductItem key={product.productId} productItem={product} />
        ))}
      </FormGroup>
      <Stack spacing={1} display="flex" alignItems="end">
        <Typography variant="h6"> 19$</Typography>
        <Button variant="contained">Order!</Button>
      </Stack>
    </Paper>
  );
}

export default Products;
