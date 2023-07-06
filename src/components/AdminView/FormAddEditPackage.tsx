import {
  Autocomplete,
  Box,
  FormHelperText,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useContext, useState, ChangeEvent, useEffect } from "react";
import { ProductsContext } from "../../ctx/ProductsContext";
import { ProductsType } from "../../types";

type Props = {
  onGetData: (data: ProductsType["productItems"] | null) => void;
  onError: (error: boolean) => void;
  package: ProductsType["packages"] | null;
};

export default function FormAddPackage(props: Props) {
  const data = useContext(ProductsContext);
  // const productItems = data!.productInSelectedYear;
  const years = data!.years;

  const packet = props.package ? props.package[0] : null;

  // Handle Products Included

  // Handle Year and price
  const productFullPrice = product
    ? JSON.parse(localStorage.getItem("data")!).productItems.find(
        (item: any) => item.productId === product.productId
      )
    : null;
  const productPriceInYears = product
    ? productFullPrice.productPrice.map((year: any) => year.year)
    : null;

  const [yearsArr, setYearsArr] = useState<number[]>(
    product ? productPriceInYears! : [years[0]]
  );

  const addYearHandler = () => {
    setYearsArr((prev) => [...prev, prev.at(-1)! + 1]);
  };

  const removeYearHandler = () => {
    setYearsArr((prev) => prev.slice(0, -1));
    setProductPriceInYear((prev) => prev.slice(0, -1));
  };

  const [productPriceInYear, setProductPriceInYear] = useState<
    { name?: string; year?: string; price?: string }[]
  >(product ? productFullPrice.productPrice : [{ name: "year-0" }]);
  const [productYearIsTouched, setProductYearIsTouched] = useState(
    product ? true : false
  );
  const [productPriceIsTouched, setProductPriceIsTouched] = useState(
    product ? true : false
  );
  const [productPriceInYearError, setProductPriceInYearError] = useState(
    product ? false : true
  );

  const productPriceInYearTouched = (type: string, _e: any) => {
    if (type === "year") setProductYearIsTouched(true);
    if (type === "price") setProductPriceIsTouched(true);
  };

  const changeYearPriceHandler = (type: string, event: ChangeEvent) => {
    setProductPriceInYearError(false);
    const { name, value } = event.target as HTMLInputElement;
    const valueType =
      type === "year"
        ? { name: name, year: value }
        : { name: name, price: value };
    setProductPriceInYear((prev) => {
      const addedValue = {
        ...prev.find((obj) => obj.name === name),
        ...valueType,
      };

      return [
        ...prev.filter((obj, i, arr) => {
          if (i === arr.length) return true;
          return obj.name !== name;
        }),
        addedValue,
      ];
    });
  };

  // Handle Free Products


  // // Create new Product object
  // const productId = product
  //   ? product.productId
  //   : String(productItems!.length + 1);

  // const [newProduct, setNewProduct] = useState<
  //   ProductsType["productItems"] | null
  // >(null);

  // useEffect(() => {
  //   setNewProduct([
  //     {
  //       productId: productId,
  //       productName: productName,
  //       productPrice: productPriceInYear.map((obj) => {
  //         return { year: obj.year!, price: obj.price! };
  //       }),
  //       productsRequired: reqProducts,
  //     },
  //   ]);
  // }, [productId, productName, productPriceInYear, reqProducts]);

  // //Validation
  // const [newProductError, setNewProductError] = useState(
  //   product ? false : true
  // );

  // useEffect(() => {
  //   setNewProductError(false);
  //   if (productName === "") setProductNameError(true);
  //   if (
  //     productPriceInYear.find(
  //       (obj) =>
  //         !obj.year ||
  //         !obj.price ||
  //         obj.price === "" ||
  //         obj.year === "" ||
  //         Number(obj.price) <= 0 ||
  //         Number(obj.year) < 2023 ||
  //         Number(obj.year) > 2033
  //     )
  //   )
  //     setProductPriceInYearError(true);
  //   if (productNameError || productPriceInYearError) setNewProductError(true);
  //   else setNewProductError(false);
  // }, [
  //   productName,
  //   productPriceInYear,
  //   productNameError,
  //   productPriceInYearError,
  // ]);

  // useEffect(() => {
  //   props.onGetData(newProduct);
  //   props.onError(newProductError);
  // }, [newProduct, newProductError, props]);

  return (
    <form method="POST">
      <Stack spacing={1}>
        {/* Products Included */}
        <Stack spacing={1} width={"calc(100% - 40px)"}>
        <Typography variant="body1">Products Included*</Typography>
        </Stack>

        {/* Prices */}
        <Stack spacing={1}>
          <Typography variant="body1">Prices*</Typography>
          <Stack spacing={1} alignItems={"center"}>
            {yearsArr.map((el, i, arr) => (
              <Stack key={i} direction={"row"} alignItems={"center"}>
                <TextField
                  label="Year"
                  type="number"
                  placeholder=""
                  name={`year-${i}`}
                  onChange={(e) => changeYearPriceHandler("year", e)}
                  onClick={(e) => productPriceInYearTouched("year", e)}
                  defaultValue={
                    product ? productFullPrice.productPrice[i].year : ""
                  }
                />
                <TextField
                  label="Price"
                  type="number"
                  InputProps={{ endAdornment: "PLN" }}
                  name={`year-${i}`}
                  onChange={(e) => changeYearPriceHandler("price", e)}
                  onClick={(e) => productPriceInYearTouched("price", e)}
                  defaultValue={
                    product ? productFullPrice.productPrice[i].price : ""
                  }
                />
                {i === arr.length - 1 && i > 0 ? (
                  <IconButton
                    sx={{ width: "40px", height: "40px" }}
                    aria-label="add-year"
                    onClick={removeYearHandler}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                ) : (
                  <Box sx={{ width: "40px", height: "40px" }} />
                )}
              </Stack>
            ))}

            <FormHelperText
              error
              sx={{
                visibility: `${
                  productPriceIsTouched &&
                  productYearIsTouched &&
                  productPriceInYearError
                    ? "visible"
                    : "hidden"
                }`,
              }}
            >
              Enter a valid pricing
            </FormHelperText>

            <IconButton
              sx={{ width: "40px" }}
              aria-label="add-year"
              onClick={addYearHandler}
            >
              <ControlPointIcon />
            </IconButton>
          </Stack>
        </Stack>

        {/* Free Products */}
        <Stack spacing={1} width={"calc(100% - 40px)"}>
          <Typography variant="body1" gutterBottom>
            Free Products
          </Typography>
        </Stack>
      </Stack>
    </form>
  );
}
