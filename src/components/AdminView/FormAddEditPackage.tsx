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
  onGetData: (data: ProductsType["packages"] | null) => void;
  onError: (error: boolean) => void;
  package: ProductsType["packages"] | null;
};

export default function FormAddPackage(props: Props) {
  const data = useContext(ProductsContext);
  const productItems = data!.productInSelectedYear;
  const years = data!.years;

  const packet = props.package ? props.package[0] : null;

  // Handle Products Included

  // Handle Year and price
  const packageFullPrice = packet
    ? JSON.parse(localStorage.getItem("data")!).packages.find(
        (item: any) => item.packageId === packet.packageId
      )
    : null;
  const productPriceInYears = packet
    ? packageFullPrice.packagePrice.map((year: any) => year.year)
    : null;

  const [yearsArr, setYearsArr] = useState<number[]>(
    packet ? productPriceInYears! : [years[0]]
  );

  const addYearHandler = () => {
    setYearsArr((prev) => [...prev, prev.at(-1)! + 1]);
  };

  const removeYearHandler = () => {
    setYearsArr((prev) => prev.slice(0, -1));
    setPackagePriceInYear((prev) => prev.slice(0, -1));
  };

  const [packagePriceInYears, setPackagePriceInYear] = useState<
    { name?: string; year?: string; price?: string }[]
  >(packet ? packageFullPrice.packagePrice : [{ name: "year-0" }]);
  const [packageYearIsTouched, setPackageYearIsTouched] = useState(
    packet ? true : false
  );
  const [packagePriceIsTouched, setPackagePriceIsTouched] = useState(
    packet ? true : false
  );
  const [packagePriceInYearError, setPackagePriceInYearError] = useState(
    packet ? false : true
  );

  const packagePriceInYearTouched = (type: string, _e: any) => {
    if (type === "year") setPackageYearIsTouched(true);
    if (type === "price") setPackagePriceIsTouched(true);
  };

  const changeYearPriceHandler = (type: string, event: ChangeEvent) => {
    setPackagePriceInYearError(false);
    const { name, value } = event.target as HTMLInputElement;
    const valueType =
      type === "year"
        ? { name: name, year: value }
        : { name: name, price: value };
    setPackagePriceInYear((prev) => {
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
  const freeProductsWhenEdit = packet?.productsFreeId.map(
    (free) =>
      productItems?.find((product) => product.productId === free)?.productName || null
  ) || [];
  const [freeProducts, setFreeProducts] = useState<(string | null)[] | []>(
    packet ? freeProductsWhenEdit : []
  );

  const freeProductHandler = (
    _event: React.SyntheticEvent<Element, Event>,
    value: any
  ) => {
    setFreeProducts(value)
  };
console.log(freeProducts);
  // // Create new Product object
  // const productId = packet
  //   ? packet.productId
  //   : String(productItems!.length + 1);

  // const [newProduct, setNewProduct] = useState<
  //   ProductsType["productItems"] | null
  // >(null);

  // useEffect(() => {
  //   setNewProduct([
  //     {
  //       productId: productId,
  //       productName: productName,
  //       productPrice: packagePriceInYears.map((obj) => {
  //         return { year: obj.year!, price: obj.price! };
  //       }),
  //       productsRequired: reqProducts,
  //     },
  //   ]);
  // }, [productId, productName, packagePriceInYears, reqProducts]);

  // //Validation
  // const [newProductError, setNewProductError] = useState(
  //   packet ? false : true
  // );

  // useEffect(() => {
  //   setNewProductError(false);
  //   if (productName === "") setProductNameError(true);
  //   if (
  //     packagePriceInYears.find(
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
  //   packagePriceInYears,
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
                  onClick={(e) => packagePriceInYearTouched("year", e)}
                  defaultValue={
                    packet ? packageFullPrice.packagePrice[i].year : ""
                  }
                />
                <TextField
                  label="Price"
                  type="number"
                  InputProps={{ endAdornment: "PLN" }}
                  name={`year-${i}`}
                  onChange={(e) => changeYearPriceHandler("price", e)}
                  onClick={(e) => packagePriceInYearTouched("price", e)}
                  defaultValue={
                    packet ? packageFullPrice.packagePrice[i].price : ""
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
                  packagePriceIsTouched &&
                  packageYearIsTouched &&
                  packagePriceInYearError
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
          <Autocomplete
            multiple
            id="freeProducts"
            options={productItems!.map((product) => product.productName)}
            renderInput={(params) => <TextField {...params} />}
            onChange={(event, value) => freeProductHandler(event, value)}
            defaultValue={packet ? freeProductsWhenEdit : undefined}
          />
        </Stack>
      </Stack>
    </form>
  );
}
