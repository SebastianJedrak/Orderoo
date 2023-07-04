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
};

export default function FormAddEdit(props: Props) {
  const data = useContext(ProductsContext);
  const productItems = data!.productInSelectedYear;
  const years = data!.years;

  // Handle Name
  const [productName, setProductName] = useState("");
  const [productNameError, setProductNameError] = useState(true);
  const [productNameTouched, setProductNameTouched] = useState(false);

  const productNameHandler = (e: ChangeEvent) => {
    setProductNameTouched(true);
    setProductNameError(false);
    const target = e.target as HTMLInputElement;
    setProductName(target.value);
  };

  // Handle Year and price
  const [yearsArr, setYearsArr] = useState<number[]>([years[0]]);

  const addYearHandler = () => {
    setYearsArr((prev) => [...prev, prev.at(-1)! + 1]);
  };

  const removeYearHandler = () => {
    setYearsArr((prev) => prev.slice(0, -1));
    setProductPriceInYear((prev) => prev.slice(0, -1));
  };

  const [productPriceInYear, setProductPriceInYear] = useState<
    { name?: string; year?: string; price?: string }[]
  >([{ name: "year-0" }]);
  const [productPriceInYearTouched, setProductPriceInYearTouched] =
    useState(false);
  const [productPriceInYearError, setProductPriceInYearError] = useState(true);

  const changeYearPriceHandler = (type: string, event: ChangeEvent) => {
    setProductPriceInYearTouched(true);
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

  // Handle req Products

  const [reqProducts, setReqProducts] = useState<
    { id: string; name: string }[] | []
  >([]);

  const reqHandler = (
    _event: React.SyntheticEvent<Element, Event>,
    value: any
  ) => {
    setReqProducts(
      value.map((item: string) => {
        return {
          id: productItems!.find((products) => products.productName === item)!
            .productId,
          name: item,
        };
      })
    );
  };

  // Create new Product object
  const productId = String(productItems!.length + 1);

  const [newProduct, setNewProduct] = useState<
    ProductsType["productItems"] | null
  >(null);

  useEffect(() => {
    setNewProduct([
      {
        productId: productId,
        productName: productName,
        productPrice: productPriceInYear.map((obj) => {
          return { year: obj.year!, price: obj.price! };
        }),
        productsRequired: reqProducts,
      },
    ]);
  }, [productId, productName, productPriceInYear, reqProducts]);

  //Validation
  const [newProductError, setNewProductError] = useState(true);

  useEffect(() => {
    setNewProductError(false);
    if (productName === "") setProductNameError(true);
    if (productPriceInYear.find((obj) => obj.price === "" || obj.year === "" || Number(obj.price) <= 0 || Number(obj.year) < 2023 || Number(obj.year) > 2033))
      setProductPriceInYearError(true);
    if (productNameError || productPriceInYearError) setNewProductError(true);
    else setNewProductError(false);
  }, [
    productName,
    productPriceInYear,
    productNameError,
    productPriceInYearError,
  ]);

  useEffect(() => {
    props.onGetData(newProduct);
    props.onError(newProductError);
  }, [newProduct, newProductError, props]);

  return (
    <form method="POST">
      <Stack spacing={1}>
        {/* NAME */}
        <Stack spacing={1} width={"calc(100% - 40px)"}>
          <Typography variant="body1">Product Name*</Typography>
          <TextField
            type="text"
            name="productName"
            onChange={productNameHandler}
            placeholder="Name"
          />

          <FormHelperText
            error
            sx={{
              visibility: `${
                productNameTouched && productNameError ? "visible" : "hidden"
              }`,
            }}
          >
            Enter a valid product name
          </FormHelperText>
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
                />
                <TextField
                  label="Price"
                  type="number"
                  InputProps={{ endAdornment: "PLN" }}
                  name={`year-${i}`}
                  onChange={(e) => changeYearPriceHandler("price", e)}
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
                  productPriceInYearTouched && productPriceInYearError
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

        {/* REQ */}
        <Stack spacing={1} width={"calc(100% - 40px)"}>
          <Typography variant="body1" gutterBottom>
            Required Products
          </Typography>
          <Autocomplete
            multiple
            id="reqProducts"
            options={productItems!.map((product) => product.productName)}
            renderInput={(params) => <TextField {...params} />}
            onChange={(event, value) => reqHandler(event, value)}
          />
        </Stack>
      </Stack>
    </form>
  );
}
