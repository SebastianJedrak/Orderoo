import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { useContext, useState } from "react";
import { ProductsContext } from "../ctx/ProductsContext";
import { ExpandMore } from "@mui/icons-material";

export default function Packages() {
  const data = useContext(ProductsContext);
  const productItems = data?.productInSelectedYear;
  const packages = data?.packageInSelectedYear;

  // Accordion open control
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Paper
      component="section"
      elevation={3}
      sx={{ mx: "auto", padding: 5, maxWidth: 700 }}
    >
      {/* Header */}
      <Typography variant="h5" gutterBottom textAlign="center" color="primary">
        Our Packages
      </Typography>

      {/* Accordion */}
      {packages?.map((packageItem) => (
        <Accordion
          key={packageItem.packageId}
          expanded={expanded === packageItem.packageName}
          onChange={handleChange(packageItem.packageName)}
        >
          <AccordionSummary
            aria-controls={packageItem.packageName}
            id={String(packageItem.packageId)}
            expandIcon={<ExpandMore />}
          >
            <Typography>{packageItem.packageName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              If you order{" "}
              <Box component="span" fontWeight="fontWeightBold">
                {" "}
                {packageItem.productsIncludedId.reduce((acc, item) => {
                  return (acc +=
                    productItems!.find(
                      (productItem) => productItem.productId === item
                    )!.productName + ", ");
                }, "")}
              </Box>
              you will get "discount%" discount. "if free" You might also get
              "freeItems" for free.{" "}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
}
