import "./App.css";
import Box from "@mui/material/Box/Box";
import Header from "./components/Header";
import OrderForm from "./components/Order/OrderForm";
import PackagesAccordion from "./components/PackagesAccordion";
import ProductsProvider from "./ctx/ProductsContext";
import Footer from "./components/Footer";

function App() {
  return (
    <ProductsProvider>
      <Box>
        <Header />
        <OrderForm />
        <PackagesAccordion />
        <Footer />
      </Box>
    </ProductsProvider>
  );
}

export default App;
