import "./App.css";
import Box from "@mui/material/Box/Box";
import Header from "./components/Header";
import OrderForm from "./components/ClientView/Order/OrderForm";
import PackagesAccordion from "./components/ClientView/PackagesAccordion";
import ProductsProvider from "./ctx/ProductsContext";
import Footer from "./components/Footer";

import bgImg from "./img/bg/2000x3000.png";
import { useState } from "react";
import AdminView from "./components/AdminView/AdminView";

function App() {
  const [view, setView] = useState("user");

  console.log(view);

  return (
    <ProductsProvider>
      <Box>
        <Header view={view} changeView={setView} />
        {view === "user" && (
          <Box
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
            <PackagesAccordion />
          </Box>
        )}
        {view === "admin" && (
          <Box
            sx={{
              py: 5,
              px: 3,
              background: `url(${bgImg}) top no-repeat`,
              backgroundSize: "cover",
              backgroundBlendMode: "soft-light",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
            }}
          >
            <AdminView />
          </Box>
        )}

        <Footer />
      </Box>
    </ProductsProvider>
  );
}

export default App;
