import "./App.css";
import Box from "@mui/material/Box/Box";
import Header from "./components/Header";
import Products from "./components/order/Products";
import PackagesAccordion from "./components/PackagesAccordion"

function App() {
  return (
    <Box>
      <Header />
      <Products />
      <PackagesAccordion />
    </Box>
  );
}

export default App;
