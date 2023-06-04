import { Paper } from "@mui/material";
import { useContext } from "react";
import { ProductsContext } from "../ctx/ProductsContext";

export default function Packages() {
  const data = useContext(ProductsContext);
  const productItems = data?.productItems;
  const packages = data?.packages;

  return (
    <Paper
      component="section"
      elevation={3}
      sx={{ margin: 5, padding: 5 }}
    ></Paper>
  );
}
