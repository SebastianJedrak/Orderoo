/* eslint-disable @typescript-eslint/no-unused-expressions */
import { SetStateAction, createContext, useEffect, useState } from "react";
import { ProductsType } from "../types";

export const ProductsContext = createContext<{
  productInSelectedYear: ProductsType["productItems"] | null;
  packageInSelectedYear: ProductsType["packages"] | null;
  selectedYear: string;
  setSelectedYear: React.Dispatch<SetStateAction<string>>;
  setData: React.Dispatch<SetStateAction<ProductsType | null>>;
  years: number[]
} | null>(null);

export default function ProductsProvider(props: { children: React.ReactNode }) {
  const [data, setData] = useState<ProductsType | null>(null);
  const [dataStorage, setDataStorage] = useState<ProductsType | null>(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [productInSelectedYear, setProductInSelectedYear] = useState<
    ProductsType["productItems"] | null
  >(null);
  const [packageInSelectedYear, setPackageInSelectedYear] = useState<
    ProductsType["packages"] | null
  >(null);

  // Fetch data
  async function getData() {
    try {
      const response = await window.fetch("https://orderoo-b6ce1-default-rtdb.europe-west1.firebasedatabase.app/");
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setData(data);
      localStorage.setItem("data", JSON.stringify(data));
    } catch (error: any) {
      console.error(`Something goes wrong ${error.message}`);
    }
  }
  // localStorage.removeItem("data");

  useEffect(() => {
    if (localStorage.data === "" || !localStorage.data) getData();
    if (localStorage.data !== "" || localStorage.data !== "null") {
      const dataStorage = localStorage.getItem("data");
      const dataParse = JSON.parse(dataStorage!);
      setDataStorage(dataParse);
    }
  }, [data]);

    // Declare years
    const [years, setYears] = useState<number[] | []>([]);

    useEffect(() => {
      if (dataStorage) {
        const getYearsFromItems = dataStorage!.productItems.flatMap((item) =>
          item.productPrice.map((year) => year.year)
        );
        const uniqueYears = getYearsFromItems!.filter(
          (year, i, arr) => arr.indexOf(year) === i
        );
    
        setYears(uniqueYears.map(item => Number(item)));}
      
    }, [dataStorage]);
  

  // Transform data
  useEffect(() => {
    if (dataStorage) {
      setProductInSelectedYear(
        dataStorage.productItems.map((item) => {
          const product = {
            ...item,
            productPrice: item.productPrice.filter(
              (year) => year.year === selectedYear
            ),
          };
          return product;
        })
      );

      setPackageInSelectedYear(
        dataStorage.packages.map((item) => {
          const packageItem = {
            ...item,
            packagePrice: item.packagePrice.filter(
              (year) => year.year === selectedYear
            ),
          };
          return packageItem;
        })
      );
    }
  }, [dataStorage, selectedYear]);


  return (
    <ProductsContext.Provider
      value={{
        productInSelectedYear,
        packageInSelectedYear,
        setSelectedYear,
        selectedYear,
        setData,
        years
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
}
