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
  const packages = data?.packageInSelectedYear;

  return (
    <Paper component="section" elevation={3} sx={{ margin:  "2.5rem auto", padding: 5, maxWidth: 700 }}>
      {/* Header */}
      <Typography variant="h5" gutterBottom textAlign="center" color="primary">
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
