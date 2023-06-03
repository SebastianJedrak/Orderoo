import { Paper } from "@mui/material";
import products from "../../data/products.json";
import ProductItem from "./ProductItem";


function Products() {
  const productsItems = products.productItems;
  return (
    <Paper>
      {productsItems.map((product) => (
        <ProductItem key={product.productId} productItem={product}/>
      ))}
    </Paper>
  );
}

export default Products;
