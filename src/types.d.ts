export type ProductsType = {
  productItems: {
    productId: number;
    productName: string;
    productPrice: { year: string; price: string }[];
  }[];
  packages: {
    packageId: number;
    packageName: string;
    packagePrice: { year: string; price: string }[];
    productsIncludedId: number[];
    productsFreeId: (number | null)[];
  }[];
};

export type OrderType = {
  selectedYear: number,
  orderedItems: number[],
}