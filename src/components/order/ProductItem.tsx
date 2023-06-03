import { ProductItemType } from "../../types";
import { FormControlLabel, Checkbox } from "@mui/material";

type Props = {
  productItem: ProductItemType;
};

export default function ProductItem({ productItem }: Props) {
  console.log(productItem);
  return (
    <FormControlLabel
      sx={{ width: "max-content" }}
      control={<Checkbox />}
      label={productItem.productName}
    />
  );
}
