export type ProductsType = {
  productItems: {
    productId: string;
    productName: string;
    productPrice: { year: string; price: string }[];
  }[];
  packages: {
    packageId: string;
    packageName: string;
    packagePrice: { year: string; price: string }[];
    productsIncludedId: string[];
    productsFreeId: (string | null)[];
  }[];
};

export type OrderType = {
  totalPrice: string,
  orderedItems: ProductsType["productItems"],
}