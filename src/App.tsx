import "./App.css";
import Box from "@mui/material/Box/Box";
import Header from "./components/Header";
import OrderForm from "./components/Order/OrderForm";
import PackagesAccordion from "./components/PackagesAccordion";
import ProductsProvider from "./ctx/ProductsContext";
import Footer from "./components/Footer";

import bgImg from "./img/bg/2000x3000.png";

function App() {
  return (
    <ProductsProvider>
      <Box>
        <Header />
        <Box
          sx={{
            py: 5,
            background: `url(${bgImg}) center no-repeat`,
            backgroundSize: "cover",
            backgroundBlendMode: "soft-light",
            backgroundColor:  "rgba(255, 255, 255, 0.6)"
          }}
        >
          <OrderForm />
          <PackagesAccordion />
        </Box>
        <Footer />
      </Box>
    </ProductsProvider>
  );
}

export default App;
