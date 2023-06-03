import { ProductItemType } from "../../types";

type Props = {
  productItem: ProductItemType;
};

export default function ProductItem({productItem}: Props) {
  console.log(productItem);
  return <div>ProductItem</div>;
}
