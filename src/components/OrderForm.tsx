import {
  Paper,
  FormGroup,
  Button,
  Typography,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  SelectChangeEvent,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../ctx/ProductsContext";
import { OrderType, ProductsType } from "../types";

const YEARS = [2023, 2024, 2025];

function Products() {
  const data = useContext(ProductsContext);
  const productItems = data?.productItems;
  const packageItems = data?.packages;
  console.log(packageItems);

  // Form control
  const [formValues, setFormValues] = useState<OrderType | null>(null);
  const [isCheckboxError, setIsCheckboxError] = useState(false);
  const [isYearError, setIsYearError] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [orderedItems, setOrderedItems] = useState<
    OrderType["orderedItems"] | []
  >([]);
  const [acivePackages, setAcivePackages] = useState<
    ProductsType["packages"] | []
  >([]);
  const [orderWithPackages, setOrderWithPackages] = useState<
    OrderType["orderedItems"] | []
  >([]);
  const [totalPrice, setTotalPrice] = useState("0");

  const handleChangeYear = (e: SelectChangeEvent) => {
    // Reset error
    if (isYearError) setIsYearError(false);

    // Set Year
    const selectedValue = String(e.target.value);
    setSelectedYear(selectedValue);
  };

  const handleChangeCheckbox = (
    event: React.SyntheticEvent<Element, Event>
  ) => {
    // Reset error
    if (isCheckboxError) setIsCheckboxError(false);

    // Set orderItems
    const target = event.target as HTMLInputElement;
    const targetProduct = JSON.parse(target.value);
    if (target.checked) setOrderedItems([...orderedItems, targetProduct]);
    if (!target.checked)
      setOrderedItems(
        [...orderedItems].filter(
          (
            object // @ts-ignore
          ) => object.productId !== targetProduct.productId
        )
      );
  };

  // Set active packages
  useEffect(() => {
    if (orderedItems.length > 0) {
      setAcivePackages(packageItems!.map((packageItem) => packageItem));
      // @ts-ignore
      const orderItemsId = orderedItems.map((item) => item.productId);
      const packageId = packageItems?.map((item) => item.productsIncludedId);
      console.log(orderItemsId);
      console.log(packageId);
      const isSubset = (array1: any, array2: any) =>
        array2.every((element: any) => array1.includes(element));

      const packets = packageId?.map((packet) =>
        isSubset(orderItemsId, packet)
      );

      // console.log(packets);
      // @ts-ignore
    }
  }, [orderedItems, packageItems]);

  // Set price
  useEffect(() => {
    const filterItemInYears = orderedItems.flatMap((item) =>
      // @ts-ignore
      item.productPrice.filter((year) => year.year === selectedYear)
    );
    const filterPriceInYears = filterItemInYears.map((object) =>
      Number(object.price)
    );
    if (filterPriceInYears.length > 0)
      setTotalPrice(
        String(
          filterPriceInYears.reduce(
            (acc: number, price: number) => (acc = price + acc)
          )
        )
      );
    if (filterPriceInYears.length < 1) setTotalPrice("0");
  }, [selectedYear, orderedItems]);

  // Set formValues
  useEffect(
    () => setFormValues({ selectedYear, orderedItems, totalPrice }),
    [selectedYear, orderedItems, totalPrice]
  );

  // Handle submit
  const submitHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    // Validation
    if (
      formValues?.orderedItems.length === 0 &&
      formValues?.selectedYear === ""
    ) {
      setIsCheckboxError(true);
      setIsYearError(true);
      return;
    }
    if (formValues?.orderedItems.length === 0) return setIsCheckboxError(true);
    if (formValues?.selectedYear === "") return setIsYearError(true);
    console.log(formValues);
  };

  return (
    <Paper component="section" elevation={3} sx={{ margin: 5, padding: 5 }}>
      {/* Header */}
      <Typography variant="h5" gutterBottom textAlign="center">
        Place Your Order
      </Typography>
      <form method="POST">
        {/* Select year */}
        <FormControl
          fullWidth
          error={isYearError}
          sx={{ margin: "20px 0" }}
          variant="standard"
        >
          <InputLabel size="small" id="select-year-label">
            Select year
          </InputLabel>
          <Select
            sx={{ width: "150px" }}
            size="small"
            labelId="select-year-label"
            label="Select year"
            id="select-year"
            value={selectedYear}
            onChange={handleChangeYear}
          >
            {YEARS.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText
            sx={{ visibility: `${isYearError ? "visible" : "hidden"}` }}
          >
            You need to choose year of order
          </FormHelperText>
        </FormControl>

        {/* Checkbox items*/}
        <FormControl fullWidth error={isCheckboxError} variant="standard">
          <FormLabel>Choose your items</FormLabel>
          <FormGroup>
            {productItems?.map((product) => (
              <FormControlLabel
                key={product.productId}
                sx={{ width: "max-content" }}
                control={<Checkbox />}
                label={product.productName}
                value={JSON.stringify(product)}
                onChange={handleChangeCheckbox}
              />
            ))}
          </FormGroup>
          <FormHelperText
            sx={{ visibility: `${isCheckboxError ? "visible" : "hidden"}` }}
          >
            You need to choose minimum one item to order
          </FormHelperText>
        </FormControl>

        {/* Summary and order*/}
        <Stack spacing={1} display="flex" alignItems="end">
          <Typography variant="h6"> {totalPrice} PLN</Typography>
          <Button onClick={submitHandler} type="submit" variant="contained">
            Order!
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default Products;
