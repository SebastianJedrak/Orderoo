import { Box } from "@mui/material";
import bgImg from "../../img/bg/2000x3000.png"
import OrderForm from "./Order/OrderForm";
import PackagesAccordion from "./PackagesAccordion"

export default function Order() {
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
    <OrderForm />
    {/* <PackagesAccordion /> */}
  </Box>
  )
}
