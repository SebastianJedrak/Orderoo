import "./App.css";
import Box from "@mui/material/Box/Box";
import Header from "./components/Header";
import OrderForm from "./components/OrderForm"
import PackagesAccordion from "./components/PackagesAccordion";
import ProductsProvider from "./ctx/ProductsContext";

function App() {
  return (
    <ProductsProvider>
      <Box>
        <Header />
        <OrderForm />
        <PackagesAccordion />
      </Box>
    </ProductsProvider>
  );
}

export default App;
