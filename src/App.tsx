import "./App.css";
import Box from "@mui/material/Box/Box";
import Header from "./components/Header";
import ProductsProvider from "./ctx/ProductsContext";
import Footer from "./components/Footer";

import { useState } from "react";
import Admin from "./components/AdminView/Admin";
import Order from "./components/ClientView/Order";

function App() {
  const [view, setView] = useState("user");

  return (
    <ProductsProvider>
      <Box >
        <Header view={view} changeView={setView} />
        {view === "user" && <Order />}
        {view === "admin" && <Admin/>}
        <Footer />
      </Box>
    </ProductsProvider>
  );
}

export default App;
