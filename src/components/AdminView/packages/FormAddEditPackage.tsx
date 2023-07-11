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
import {
  useContext,
  useState,
  ChangeEvent,
  useEffect,
  useCallback,
} from "react";
import { ProductsContext } from "../../../ctx/ProductsContext";
import { ProductsType } from "../../../types";

type Props = {
  onGetData: (data: ProductsType["packages"] | null) => void;
  onError: (error: boolean) => void;
  package: ProductsType["packages"] | null;
};

export default function FormAddPackage(props: Props) {
  const data = useContext(ProductsContext);
  const productItems = data!.productInSelectedYear;
  const packageItems = data!.packageInSelectedYear;
  const years = data!.years;

  const packet = props.package ? props.package[0] : null;

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

  const productPriceInYearNameWhenEdit = packet
    ? packageFullPrice.packagePrice.map((product: any, i: number) => {
        return { name: `year-${i}`, ...product };
      })
    : null;

  const [packagePriceInYears, setPackagePriceInYear] = useState<
    { name?: string; year?: string; price?: string }[]
  >(productPriceInYearNameWhenEdit || [{ name: "year-0" }]);
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

  // Handle Products Included
  const [productsIncludedOptions, setProductsIncludedOptions] = useState<
    string[] | []
  >([]);

  useEffect(() => {
    const storageProducts: ProductsType["productItems"] = JSON.parse(
      localStorage.getItem("data")!
    ).productItems;

    const optionsArr = storageProducts.filter((item) =>
      packagePriceInYears
        .map((packet) => packet.year!)
        .every((year) =>
          item.productPrice.map((year) => year.year).includes(year)
        )
    );

    setProductsIncludedOptions(optionsArr.map((item) => item.productName));
  }, [packagePriceInYears]);

  const includedProductsWhenEdit =
    packet?.productsIncludedId.map(
      (free) =>
        productItems?.find((product) => product.productId === free)
          ?.productName || null
    ) || [];

  const [includedProducts, setIncludedProducts] = useState<
    (string | null)[] | []
  >(packet ? includedProductsWhenEdit : []);
  const [includedProductsError, setIncludedProductsError] = useState(
    packet ? false : true
  );
  const [includedProductsTouched, setIncludedProductsTouched] = useState(
    packet ? true : false
  );

  const includedProductHandler = (
    _event: React.SyntheticEvent<Element, Event>,
    value: any
  ) => {
    setIncludedProductsTouched(true);
    setIncludedProductsError(false);
    setIncludedProducts(value);
  };

  // Handle Free Products
  const freeProductsWhenEdit =
    packet?.productsFreeId.map(
      (free) =>
        productItems?.find((product) => product.productId === free)
          ?.productName || null
    ) || [];
  const [freeProducts, setFreeProducts] = useState<(string | null)[] | []>(
    packet ? freeProductsWhenEdit : []
  );

  const freeProductHandler = (
    _event: React.SyntheticEvent<Element, Event>,
    value: any
  ) => {
    setFreeProducts(value);
  };

  // Create new Package object
  const packageId = packet
    ? packet.packageId
    : String(packageItems!.length + 1);

  const [newPackage, setNewPackage] = useState<ProductsType["packages"] | null>(
    null
  );

  const namesToIdProducts = useCallback(
    (arr: (string | null)[] | []) => {
      return arr.map(
        (product) =>
          productItems!.find((items) => items.productName === product)!
            .productId
      );
    },
    [productItems]
  );

  useEffect(() => {
    setNewPackage([
      {
        packageId: packageId,
        packageName: includedProducts.join(" + "),
        packagePrice: packagePriceInYears.map((obj) => {
          return { year: obj.year!, price: obj.price! };
        }),
        productsIncludedId: namesToIdProducts(includedProducts),
        productsFreeId: namesToIdProducts(freeProducts),
      },
    ]);
  }, [
    packageId,
    includedProducts,
    packagePriceInYears,
    freeProducts,
    namesToIdProducts,
  ]);

  //Validation
  const [newPackageError, setNewPackageError] = useState(packet ? false : true);

  useEffect(() => {
    setNewPackageError(false);
    if (includedProducts.length < 2) setIncludedProductsError(true);
    if (
      packagePriceInYears.find(
        (obj) =>
          !obj.year ||
          !obj.price ||
          obj.price === "" ||
          obj.year === "" ||
          Number(obj.price) <= 0 ||
          Number(obj.year) < 2023 ||
          Number(obj.year) > 2033
      )
    )
      setPackagePriceInYearError(true);
    if (includedProductsError || packagePriceInYearError)
      setNewPackageError(true);
    else setNewPackageError(false);
  }, [
    includedProducts,
    packagePriceInYears,
    includedProductsError,
    packagePriceInYearError,
  ]);

  useEffect(() => {
    props.onGetData(newPackage);
    props.onError(newPackageError);
  }, [newPackage, newPackageError, props]);

  return (
    <form method="POST">
      <Stack spacing={1}>
        {/* Prices */}
        <Stack spacing={1}>
          <Typography variant="body1">Prices*</Typography>
          <Stack spacing={1} alignItems={"center"}>
            {yearsArr.map((el, i, arr) => (
              <Stack key={i} direction={"row"} alignItems={"center"} width={"100%"}>
                <TextField
                  label="Year"
                  type="text"
                  placeholder=""
                  name={`year-${i}`}
                  onChange={(e) => changeYearPriceHandler("year", e)}
                  onClick={(e) => packagePriceInYearTouched("year", e)}
                  defaultValue={
                    packet ? packageFullPrice.packagePrice[i] ? packageFullPrice.packagePrice[i].year : "" : ""
                  }
                />
                <TextField
                  label="Price"
                  type="text"
                  InputProps={{ endAdornment: "PLN" }}
                  name={`year-${i}`}
                  onChange={(e) => changeYearPriceHandler("price", e)}
                  onClick={(e) => packagePriceInYearTouched("price", e)}
                  defaultValue={
                    packet ? packageFullPrice.packagePrice[i] ? packageFullPrice.packagePrice[i].price : "" : ""
                  }
                />
                {i === arr.length - 1 && i > 0 && (
                  <IconButton
                    sx={{ width: "40px", height: "40px" }}
                    aria-label="add-year"
                    onClick={removeYearHandler}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
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

        {/* Products Included */}
        <Stack spacing={1} width={"calc(100% - 40px)"}>
          <Typography variant="body1">Products Included*</Typography>
          <Autocomplete
            multiple
            id="includedProducts"
            options={productsIncludedOptions}
            renderInput={(params) => <TextField {...params} />}
            onChange={(event, value) => includedProductHandler(event, value)}
            defaultValue={packet ? includedProductsWhenEdit : undefined}
          />
          <FormHelperText
            error
            sx={{
              visibility: `${
                includedProductsTouched && includedProductsError
                  ? "visible"
                  : "hidden"
              }`,
            }}
          >
            You need to choose minimum two products
          </FormHelperText>
          {productsIncludedOptions.length === 0 && (
            <FormHelperText>
              You need to select years first, product must be available in all
              years
            </FormHelperText>
          )}
        </Stack>

        {/* Free Products */}
        <Stack spacing={1} width={"calc(100% - 40px)"}>
          <Typography variant="body1" gutterBottom>
            Free Products
          </Typography>
          <Autocomplete
            multiple
            id="freeProducts"
            options={productsIncludedOptions}
            renderInput={(params) => <TextField {...params} />}
            onChange={(event, value) => freeProductHandler(event, value)}
            defaultValue={packet ? freeProductsWhenEdit : undefined}
          />
        </Stack>
      </Stack>
    </form>
  );
}
