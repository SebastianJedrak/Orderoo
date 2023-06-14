import { Paper, Button, Typography, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../ctx/ProductsContext";
import { OrderType, ProductsType } from "../../types";
import SelectYear from "./SelectYear";
import DialogFormSubmit from "./DialogFormSubmit";
import CheckboxProducts from "./CheckboxProducts";
import SummaryPrices from "./SummaryPrices";

export default function OrderForm() {
  const data = useContext(ProductsContext);
  const productItems = data?.productInSelectedYear;
  const packageItems = data?.packageInSelectedYear;

  // Form control
  const [formValues, setFormValues] = useState<OrderType | null>(null);
  const [isCheckboxError, setIsCheckboxError] = useState(false);
  const [notOrderedRequiredError, setNotOrderedRequiredError] =
    useState<(string | boolean)[]>();

  const [orderedItems, setOrderedItems] = useState<
    OrderType["orderedItems"] | []
  >([]);
  const [activePackages, setActivePackages] = useState<
    ProductsType["packages"] | []
  >([]);

  const [totalPrice, setTotalPrice] = useState("0");
  const [discountPrice, setDiscountPrice] = useState("0");

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    const isAnyRequired = orderedItems.map((item, i, arr) => {
      if (item.productsRequired.length > 0) {
        const itemDemands = item.productsRequired.find((reqItem) =>
          arr.find((arrItem) => arrItem.productId.includes(reqItem.id))
        );
        if (itemDemands) return false;
        if (!itemDemands) return item.productId;
      }
      return false;
    });

    setNotOrderedRequiredError(isAnyRequired);
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
      if (item.packageId) return Number(item.totalPrice);
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
    if (notOrderedRequiredError?.some((item) => item !== false)) return;
    console.log(formValues);
    setIsModalOpen(true);
  };

  return (
    <Paper component="section" elevation={3} sx={{ margin: 5, padding: 5 }}>
      {/* Header */}
      <Typography variant="h5" gutterBottom textAlign="center" color="primary">
        Place Your Order
      </Typography>

      {/* Form */}
      <form method="POST">
        <SelectYear />
        <CheckboxProducts
          productItems={productItems}
          isCheckboxError={isCheckboxError}
          orderedItems={orderedItems}
          notOrderedRequiredError={notOrderedRequiredError}
          setOrderedItems={setOrderedItems}
          setIsCheckboxError={setIsCheckboxError}
        />

        {/* Summary and order*/}
        <Stack spacing={1} display="flex" alignItems="end">
          <SummaryPrices
            discountPriceVisible={discountPriceVisible}
            discountPrice={discountPrice}
            totalPrice={totalPrice}
          />
          <Button onClick={submitHandler} color="secondary" type="submit" variant="contained">
            Order!
          </Button>
        </Stack>
      </form>
      <DialogFormSubmit
        isOpen={isModalOpen}
        onClose={setIsModalOpen}
        order={formValues}
      />
    </Paper>
  );
}
