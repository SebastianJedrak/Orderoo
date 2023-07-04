import {
  Autocomplete,
  Box,
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
};

export default function FormAddEdit(props: Props) {
  const data = useContext(ProductsContext);
  const productItems = data!.productInSelectedYear;
  const years = data!.years


  // Handle Name
  const [productName, setProductName] = useState("");
  const productNameHandler = (e: ChangeEvent) => {
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

  const changeYearPriceHandler = (type: string, event: ChangeEvent) => {
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
          id: productItems!.find((products) => products.productName === item)!.productId ,
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
    setNewProduct([{
      productId: productId,
      productName: productName,
      productPrice: productPriceInYear.map((obj) => {
        return { year: obj.year!, price: obj.price! };
      }),
      productsRequired: reqProducts,
    }]);
    props.onGetData(newProduct);
  }, [productId, productName, productPriceInYear, reqProducts, newProduct, props]);


  return (
    <form method="POST">
      <Stack spacing={2}>
        {/* NAME */}
        <Stack spacing={1} width={"calc(100% - 40px)"}>
          <Typography variant="body1">Product Name</Typography>
          <TextField
            type="text"
            required
            name="productName"
            onChange={productNameHandler}
          />
        </Stack>

        {/* Prices */}
        <Stack spacing={1}>
          <Typography variant="body1">Prices</Typography>
          <Stack spacing={1} alignItems={"center"}>
            {yearsArr.map((el, i, arr) => (
              <Stack key={i} direction={"row"} alignItems={"center"}>
                <TextField
                  label="Year"
                  type="number"
                  placeholder=""
                  required
                  name={`year-${i}`}
                  onChange={(e) => changeYearPriceHandler("year", e)}
                />
                <TextField
                  label="Price"
                  type="number"
                  InputProps={{ endAdornment: "PLN" }}
                  required
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
            options={productItems!.map(
              (product) => product.productName
            )}
            renderInput={(params) => <TextField {...params} />}
            onChange={(event, value) => reqHandler(event, value)}
          />
        </Stack>
      </Stack>
    </form>
  );
}
