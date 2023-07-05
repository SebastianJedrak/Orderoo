import { Box } from "@mui/material";
import bgImg from "../../img/bg/2000x3000.png";
import AdminView from "./AdminView";
import { useContext } from "react";
import { ProductsContext } from "../../ctx/ProductsContext";


export default function Admin() {
  const data = useContext(ProductsContext);
  const productItems = data?.productInSelectedYear;
  const packageItems = data?.packageInSelectedYear;

  return (
    <Box minHeight={"80vh"}
    sx={{
      py: 5,
      px: 3,
      background: `url(${bgImg}) top no-repeat`,
      backgroundSize: "cover",
      backgroundBlendMode: "soft-light",
      backgroundColor: "rgba(255, 255, 255, 0.6)",
    }}
  >
    <AdminView products={productItems}/>
  </Box>
  )
}
