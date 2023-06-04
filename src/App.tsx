import "./App.css";
import Box from "@mui/material/Box/Box";
import Header from "./components/Header";
import Products from "./components/order/Products";
import PackagesAccordion from "./components/PackagesAccordion";
import ProductsProvider from "./ctx/ProductsContext";

function App() {
  return (
    <ProductsProvider>
      <Box>
        <Header />
        <Products />
        <PackagesAccordion />
      </Box>
    </ProductsProvider>
  );
}

export default App;
