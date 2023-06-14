import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
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
      <FormLabel>Choose your items</FormLabel>
      <FormGroup sx={{ mb: "32px" }}>
        {props.productItems?.map((product) => (
          <Fragment key={product.productId}>
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
                    ? "red"
                    : "gray"
                }
                variant="body2"
              >
                You need to order{" "}
                {product.productsRequired.map((req) => req.name + " ")}
              </Typography>
            )}
          </Fragment>
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
