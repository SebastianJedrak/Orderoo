import { SetStateAction, createContext, useEffect, useState } from "react";
import { ProductsType } from "../types";

export const ProductsContext = createContext<{
  productInSelectedYear: ProductsType["productItems"] | null;
  packageInSelectedYear: ProductsType["packages"] | null;
  selectedYear: string
  setSelectedYear: React.Dispatch<SetStateAction<string>>;
} | null>(null);

export default function ProductsProvider(props: { children: React.ReactNode }) {
  const [data, setData] = useState<ProductsType | null>(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [productInSelectedYear, setProductInSelectedYear] = useState<
    ProductsType["productItems"] | null
  >(null);
  const [packageInSelectedYear, setPackageInSelectedYear] = useState<
    ProductsType["packages"] | null
  >(null);

  // Fetch data
  useEffect(() => {
    async function getData() {
      try {
        const response = await window.fetch("/products.json");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setData(data);
      } catch (error: any) {
        console.error(`Something goes wrong ${error.message}`);
      }
    }
    getData();
  }, []);

  // Transform data
  useEffect(() => {
    if (data && selectedYear !== "") {
      setProductInSelectedYear(
        data.productItems.map((item) => {
          const product = {
            productId: item.productId,
            productName: item.productName,
            productPrice: item.productPrice.filter(
              (year) => year.year === selectedYear
            ),
          };
          return product;
        })
      );

      setPackageInSelectedYear(
        data.packages.map((item) => {
          const packageItem = {
            packageId: item.packageId,
            packageName: item.packageName,
            packagePrice: item.packagePrice.filter(
              (year) => year.year === selectedYear
            ),
            productsIncludedId: item.productsIncludedId,
            productsFreeId: item.productsFreeId,
          };
          return packageItem;
        })
      );
    }
  }, [data, selectedYear]);

  return (
    <ProductsContext.Provider value={{ productInSelectedYear, packageInSelectedYear, setSelectedYear, selectedYear }}>
      {props.children}
    </ProductsContext.Provider>
  );
}