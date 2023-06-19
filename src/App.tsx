import "./App.css";
import Box from "@mui/material/Box/Box";
import Header from "./components/Header";
import OrderForm from "./components/Order/OrderForm";
import PackagesAccordion from "./components/PackagesAccordion";
import ProductsProvider from "./ctx/ProductsContext";
import Footer from "./components/Footer";

import bgImg from "./img/bg/3000x4500.png";

function App() {
  return (
    <ProductsProvider>
      <Box>
        <Header />
        <Box sx={{ py: 5, backgroundImage: `url(${bgImg})` }}>
          <OrderForm />
          <PackagesAccordion />
        </Box>
        <Footer />
      </Box>
    </ProductsProvider>
  );
}

export default App;
