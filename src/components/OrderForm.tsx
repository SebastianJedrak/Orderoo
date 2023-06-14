import {
  Paper,
  FormGroup,
  Button,
  Typography,
  Stack,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../ctx/ProductsContext";
import { OrderType, ProductsType } from "../types";
import SelectYear from "./SelectYear";

function Products() {
  const data = useContext(ProductsContext);
  const productItems = data?.productInSelectedYear;
  const packageItems = data?.packageInSelectedYear;

  // Form control
  const [formValues, setFormValues] = useState<OrderType | null>(null);
  const [isCheckboxError, setIsCheckboxError] = useState(false);
  const [notOrderedRequiredError, setNotOrderedRequiredError] = useState(false);

  const [orderedItems, setOrderedItems] = useState<
    OrderType["orderedItems"] | []
  >([]);
  const [activePackages, setActivePackages] = useState<
    ProductsType["packages"] | []
  >([]);

  const [totalPrice, setTotalPrice] = useState("0");
  const [discountPrice, setDiscountPrice] = useState("0");

  // Update OrderedItems
  useEffect(() => {
    if (productItems) {
      setOrderedItems((prev) =>
        productItems.filter((item) =>
          prev.find((oldItem) => oldItem.productId === item.productId)
        )
      );
    }
  }, [productItems]);

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
        orderedItems.filter(
          (object) => object.productId !== targetProduct.productId
        )
      );
  };

  // Set error if not ordered required products
  useEffect(() => {
    const isAnyRequired = orderedItems.find((item, i, arr) =>
      item.productsRequired.find((reqItem) =>
        arr.find((arrItem) => arrItem.productsRequired.includes(reqItem))
      )
    );
    console.log(isAnyRequired);

    setNotOrderedRequiredError(true);
  }, [orderedItems]);

  // Set active packages
  useEffect(() => {
    if (orderedItems.length > 0) {
      // Create array of ordered items id
      const orderItemsId = orderedItems.map((item) => item.productId);
      // Match packets with ordered items
      const activePackets = packageItems!.filter((packageItem) =>
        packageItem.productsIncludedId.every((id) => orderItemsId.includes(id))
      );
      // Add property with price + free products to active packages
      const activePacketsTotalPrice = activePackets.map((packet) => {
        const freeProducts = orderedItems.filter((product) =>
          packet.productsFreeId.includes(product.productId)
        );
        const discount =
          freeProducts.length > 0
            ? freeProducts.reduce((acc, product) => {
                return (acc += Number(product.productPrice[0].price));
              }, 0)
            : 0;
        return {
          ...packet,
          totalPrice: String(Number(packet.packagePrice[0].price) - discount),
        };
      });
      // Compare packages and pick lowest price if overlap
      const nonOverlapItemsPackages = activePacketsTotalPrice.filter(
        (packet, _i, arr) => {
          const isOverlap = packet.productsIncludedId.find((packetSome) =>
            arr.some(
              (packetArrEl) =>
                packetArrEl.productsIncludedId.includes(packetSome) &&
                packetArrEl.packageId !== packet.packageId
            )
          );

          if (isOverlap) {
            return arr.find((packetArrEl) => {
              if (packetArrEl.productsIncludedId.includes(isOverlap)) {
                return Number(packetArrEl.totalPrice) >
                  Number(packet.totalPrice)
                  ? true
                  : false;
              } else return false;
            });
          } else return true;
        }
      );
      setActivePackages(nonOverlapItemsPackages);
    }
  }, [orderedItems, packageItems]);

  // Set price helper function
  const priceReduce = (array: number[]) => {
    return String(array.reduce((acc, price) => (acc = price + acc)));
  };

  // Set price
  useEffect(() => {
    const priceNumberArray = orderedItems.flatMap((item) =>
      Number(item.productPrice[0].price)
    );

    if (orderedItems.length > 0) setTotalPrice(priceReduce(priceNumberArray));
    if (priceNumberArray.length < 1) setTotalPrice("0");
  }, [orderedItems]);

  // Set discount price
  useEffect(() => {
    const filteredItems = orderedItems.filter((item) => {
      if (
        activePackages.some((packet) =>
          packet.productsIncludedId.includes(item.productId)
        )
      )
        return false;
      else return true;
    });
    const filteredItemsAndPackages = [...filteredItems, ...activePackages];
    const priceArray = filteredItemsAndPackages.map((item) => {
      //@ts-ignore
      if (item.productId) return Number(item.productPrice[0].price);
      //@ts-ignore
      if (item.packageId) return Number(item.packagePrice[0].price);
      return 0;
    });
    if (filteredItemsAndPackages.length > 0)
      setDiscountPrice(priceReduce(priceArray));
    if (priceArray.length < 1) setDiscountPrice("0");
  }, [orderedItems, activePackages]);

  const discountPriceVisible = Number(discountPrice) < Number(totalPrice);

  // Set formValues
  useEffect(() => {
    const price = discountPriceVisible ? discountPrice : totalPrice;
    setFormValues({ orderedItems, price });
  }, [orderedItems, totalPrice, discountPrice, discountPriceVisible]);

  // Handle submit
  const submitHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    // Validation
    if (formValues?.orderedItems.length === 0) {
      setIsCheckboxError(true);
      return;
    }
    console.log(formValues);
  };

  return (
    <Paper component="section" elevation={3} sx={{ margin: 5, padding: 5 }}>
      {/* Header */}
      <Typography variant="h5" gutterBottom textAlign="center">
        Place Your Order
      </Typography>

      {/* Form */}
      <form method="POST">
        <SelectYear />
        <FormControl fullWidth error={isCheckboxError} variant="standard">
          <FormLabel>Choose your items</FormLabel>
          <FormGroup sx={{ mb: "32px" }}>
            {productItems?.map((product) => (
              <>
                <FormControlLabel
                  key={product.productId}
                  sx={{ width: "max-content" }}
                  control={<Checkbox />}
                  label={product.productName}
                  value={JSON.stringify(product)}
                  onChange={handleChangeCheckbox}
                />
                {product.productsRequired.length !== 0 && (
                  <Typography color="gray" variant="body2">
                    You need to order{" "}
                    {product.productsRequired.map((req) => req.name + " ")}
                  </Typography>
                )}
              </>
            ))}
          </FormGroup>
          <FormHelperText
            sx={{
              visibility: `${isCheckboxError ? "visible" : "hidden"}`,
              fontSize: "1rem",
            }}
          >
            You need to choose minimum one item to order
          </FormHelperText>
        </FormControl>

        {/* Summary and order*/}
        <Stack spacing={1} display="flex" alignItems="end">
          <Typography
            sx={{
              visibility: `${discountPriceVisible ? "visible" : "hidden"}`,
              opacity: `${discountPriceVisible ? "1" : "0"}`,
              transition: "opacity linear 0.15s",
            }}
            variant="h6"
          >
            {" "}
            {discountPrice} PLN
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: `${discountPriceVisible && "gray"}`,
              textDecoration: `${discountPriceVisible && "line-through"}`,
              fontSize: `${discountPriceVisible && "1.1rem"}`,
              paddingTop: `${discountPriceVisible && "0.25rem"}`,
              transition: "all linear 0.1s",
            }}
          >
            {" "}
            {totalPrice} PLN
          </Typography>
          <Button onClick={submitHandler} type="submit" variant="contained">
            Order!
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default Products;
