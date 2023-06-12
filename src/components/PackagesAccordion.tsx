import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { ProductsContext } from "../ctx/ProductsContext";

export default function Packages() {
  const data = useContext(ProductsContext);
  // const productItems = data?.productItems;
  const packages = data?.data?.packages;

  return (
    <Paper component="section" elevation={3} sx={{ margin: 5, padding: 5 }}>
      {/* Header */}
      <Typography variant="h5" gutterBottom textAlign="center">
        Our Packages
      </Typography>

      {/* Accordion */}
      {packages?.map((packageItem) => (
        <Accordion
          key={packageItem.packageId}
          // expanded={expanded === "panel1"}
          // onChange={handleChange("panel1")}
        >
          <AccordionSummary
            aria-controls={packageItem.packageName}
            id={String(packageItem.packageId)}
          >
            <Typography>{packageItem.packageName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{packageItem.packageName}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
}
