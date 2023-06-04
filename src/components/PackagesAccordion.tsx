import { Accordion, AccordionDetails, AccordionSummary, Paper, Typography } from "@mui/material";
import { useContext } from "react";
import { ProductsContext } from "../ctx/ProductsContext";

export default function Packages() {
  const data = useContext(ProductsContext);
  const productItems = data?.productItems;
  const packages = data?.packages;

  return (
    <Paper component="section" elevation={3} sx={{ margin: 5, padding: 5 }}>
      <Accordion
        // expanded={expanded === "panel1"}
        // onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Collapsible Group Item #1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}
