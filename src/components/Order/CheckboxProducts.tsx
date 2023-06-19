import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment, SetStateAction } from "react";
import { OrderType, ProductsType } from "../../types";

type Props = {
  isCheckboxError: boolean;
  orderedItems: OrderType["orderedItems"] | [];
  productItems: ProductsType["productItems"] | null | undefined;

  notOrderedRequiredError: (string | boolean)[] | undefined;
  setOrderedItems: React.Dispatch<
    SetStateAction<OrderType["orderedItems"] | []>
  >;
  setIsCheckboxError: React.Dispatch<SetStateAction<boolean>>;
};

export default function CheckboxProducts(props: Props) {
  const handleChangeCheckbox = (
    event: React.SyntheticEvent<Element, Event>
  ) => {
    // Reset error
    if (props.isCheckboxError) props.setIsCheckboxError(false);
    // Set error if not ordered required products
    // Set orderItems
    const target = event.target as HTMLInputElement;
    const targetProduct = JSON.parse(target.value);
    if (target.checked)
      props.setOrderedItems([...props.orderedItems, targetProduct]);
    if (!target.checked)
      props.setOrderedItems(
        props.orderedItems.filter(
          (object) => object.productId !== targetProduct.productId
        )
      );
  };

  return (
    <FormControl fullWidth error={props.isCheckboxError} variant="standard">
      <FormLabel sx={{ color: "primary.main" }}>Choose your items</FormLabel>
      <FormGroup sx={{ mb: "32px" }}>
        {props.productItems?.map((product) => (
          <Stack spacing={1} key={product.productId}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              marginTop={1}
            >
              <Stack direction={"row"}  alignItems={"center"}>
                <FormControlLabel
                  sx={{ width: "max-content" }}
                  control={<Checkbox />}
                  label={product.productName}
                  value={JSON.stringify(product)}
                  onChange={handleChangeCheckbox}
                />
                {product.productsRequired.length !== 0 && (
                  <Typography
                    color={
                      props.notOrderedRequiredError?.includes(product.productId)
                        ? "error.main"
                        : "grey.500"
                    }
                    variant="body2"
                    fontSize={"0.8rem"}
                    lineHeight={0}
                  >
                    {`( You need to order
                    ${product.productsRequired.map((req) => req.name + " ")})`}
                  </Typography>
                )}
              </Stack>

              <Typography variant="body1" component="span" fontWeight={600}>
                {product.productPrice[0].price} PLN
              </Typography>
            </Stack>

            <Divider />
          </Stack>
        ))}
      </FormGroup>
      <FormHelperText
        sx={{
          visibility: `${props.isCheckboxError ? "visible" : "hidden"}`,
          fontSize: "1rem",
        }}
      >
        You need to choose minimum one item to order
      </FormHelperText>
    </FormControl>
  );
}
