import { Paper, Box } from "@mui/material";
import products from "../data/products.json";

function Products() {
const productsItems = products.products
console.log(productsItems);
  return <Paper>
    {productsItems.map(product => <Box>{product.productName}</Box>)}
  </Paper>;
}

export default Products;
