import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { useContext, useState } from "react";
import { ProductsContext } from "../../ctx/ProductsContext";
import { ExpandMore } from "@mui/icons-material";

export default function Packages() {
  const data = useContext(ProductsContext);
  const productItems = data?.productInSelectedYear;
  const packages = data?.packageInSelectedYear;

  const matchProductWithPackageId = (packageItem: any) => {
    return packageItem.reduce((acc: string, item: any, i: number, arr: any) => {
      return (
        (acc += productItems!.find(
          (productItem) => productItem.productId === item
        )!.productName) +
        (i + 1 === arr.length ? " " : i + 2 === arr.length ? " and " : ", ")
      );
    }, "");
  };

  // Accordion open control
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Paper
      component="section"
      elevation={3}
      sx={{ mx: "auto", padding: 5, mb: 5, maxWidth: 700 }}
    >
      {/* Header */}
      <Typography variant="h5" gutterBottom textAlign="center" color="primary">
        Our Packages
      </Typography>

      {/* Accordion */}
      <Box my={4}>
        {packages?.map((packageItem) => {
          if (!packageItem.packagePrice[0]) return "";
          return (
            <Accordion
              key={packageItem.packageId}
              expanded={expanded === packageItem.packageName}
              onChange={handleChange(packageItem.packageName)}
            >
              <AccordionSummary
                aria-controls={packageItem.packageName}
                id={String(packageItem.packageId)}
                expandIcon={<ExpandMore color="primary" />}
              >
                <Typography>{packageItem.packageName}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  If you order{" "}
                  <Box
                    component="span"
                    fontWeight="fontWeightBold"
                    color="secondary.dark"
                  >
                    {matchProductWithPackageId(packageItem.productsIncludedId)}
                  </Box>
                  you will get
                  <Box
                    component="span"
                    fontWeight="fontWeightBold"
                    color="secondary.dark"
                  >
                    {" "}
                    {packageItem.productsIncludedId.reduce((acc, item) => {
                      return (acc += Number(
                        productItems!.find(
                          (productItem) => productItem.productId === item
                        )!.productPrice[0].price
                      ));
                    }, 0) - Number(packageItem.packagePrice[0].price)}{" "}
                    PLN
                  </Box>{" "}
                  discount.
                  {packageItem.productsFreeId.length > 0 && (
                    <>
                      You might also get{" "}
                      <Box
                        component="span"
                        fontWeight="fontWeightBold"
                        color="secondary.dark"
                      >
                        {matchProductWithPackageId(packageItem.productsFreeId)}
                      </Box>{" "}
                      for free.
                    </>
                  )}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>

      {/* Rules */}
      <Typography variant="body2" textAlign="center" color="grey.500">
        Selected promotions cannot be combined. If you choose multiple products
        from the same package, the most advantageous one will be selected for
        you.
      </Typography>
    </Paper>
  );
}
