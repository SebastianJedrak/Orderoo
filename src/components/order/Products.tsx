import { Paper, Stack } from "@mui/material";
import products from "../../data/products.json";
import ProductItem from "./ProductItem";

function Products() {
  const productsItems = products.productItems;
  return (
    <Paper >
      <Stack>
        {productsItems.map((product) => (
          <ProductItem key={product.productId} productItem={product} />
        ))}
      </Stack>
    </Paper>
  );
}

export default Products;
