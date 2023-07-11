import { Box } from "@mui/material";
import bgImg from "../../img/bg/2000x3000.png";
import OrderForm from "./Order/OrderForm";
import PackagesAccordion from "./PackagesAccordion";
import { ProductsContext } from "../../ctx/ProductsContext";
import { useContext } from "react";

export default function Order() {
  const data = useContext(ProductsContext);
  const productItems = data?.productInSelectedYear;
  const packageItems = data?.packageInSelectedYear;

  if (!productItems || !packageItems) return <></>

  return (
    <Box
      minHeight={"80vh"}
      sx={{
        py: 5,
        px: 3,
        background: `url(${bgImg}) top no-repeat`,
        backgroundSize: "cover",
        backgroundBlendMode: "soft-light",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
      }}
    >
      {productItems!.length > 0 && <OrderForm />}
      {packageItems!.length > 0 && <PackagesAccordion />}
      
    </Box>
  );
}
