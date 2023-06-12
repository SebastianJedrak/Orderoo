import { SetStateAction, createContext, useEffect, useState } from "react";
import { ProductsType } from "../types";

export const ProductsContext = createContext<{
  data: ProductsType | null;
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
    <ProductsContext.Provider value={{ data, setSelectedYear }}>
      {props.children}
    </ProductsContext.Provider>
  );
}

// import { createContext, useEffect, useState } from "react";
// import { Store } from "./StoreProvider";

// export type GameData = {
//   title: string;
//   thumb: string;
//   normalPrice: string;
//   salePrice: string;
//   metacriticScore: string;
//   metacriticLink: string;
//   storeID: string;
//   gameID: string;
//   dealID: string;
// };

// export const GamesListContext = createContext<{
//   gamesList: GameData[];
//   setSearch: React.Dispatch<React.SetStateAction<string>>;
//   setSortBy: React.Dispatch<React.SetStateAction<string>>;
//   setSortDirection: React.Dispatch<React.SetStateAction<number>>;
//   setOnSale: React.Dispatch<React.SetStateAction<number>>;
//   sortBy: string;
//   sortDirection: number;
//   onSale: number;
//   activeStoresId: string[];
//   setActiveStores: React.Dispatch<React.SetStateAction<Store[]>>;
//   isLoading: boolean;
//   search: string;
//   isError: string;
// }>({
//   gamesList: [],
//   setSearch: () => {},
//   setSortBy: () => {},
//   sortBy: "",
//   sortDirection: 0,
//   onSale: 0,
//   setSortDirection: () => {},
//   setOnSale: () => {},
//   activeStoresId: [],
//   setActiveStores: () => {},
//   isLoading: false,
//   search: "",
//   isError: "",
// });

// export default function GamesListProvider(props: {
//   children: React.ReactNode;
// }) {
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [gamesList, setGamesList] = useState<GameData[]>([]);
//   const [search, setSearch] = useState("");
//   const [sortBy, setSortBy] = useState("recent");
//   const [sortDirection, setSortDirection] = useState(0);
//   const [onSale, setOnSale] = useState(0);
//   const [isError, setIsError] = useState<string>("");

//   //active stores filter
//   const [activeStores, setActiveStores] = useState<Store[]>([]);
//   const activeStoresId = activeStores.map((store) => store.storeID);
//   const activeStoresIdString = activeStoresId.join(",");

//   // Filters: Metacritic, recent, Store, Price, Title

//   useEffect(() => {
//     async function getData() {
//       try {
//         setIsLoading(true);
//         const response = await window.fetch(
//           `https://www.cheapshark.com/api/1.0/deals?sortBy=${sortBy}&title=${search}&desc=${sortDirection}&onSale=${onSale}&storeID=${activeStoresIdString}`
//         );
//         if (!response.ok) throw new Error("Failed to fetch data");
//         const data = await response.json();
//         setGamesList(data);
//       } catch (error: any) {
//         setIsError(`Something goes wrong ${error.message}`);
//       }
//       setIsLoading(false);
//     }
//     getData();
//   }, [search, sortBy, sortDirection, onSale, activeStoresIdString]);

//   return (
//     <GamesListContext.Provider
//       value={{
//         gamesList,
//         setSearch,
//         setSortBy,
//         sortBy,
//         sortDirection,
//         setSortDirection,
//         onSale,
//         setOnSale,
//         activeStoresId,
//         setActiveStores,
//         isLoading,
//         search,
//         isError,
//       }}
//     >
//       {props.children}
//     </GamesListContext.Provider>
//   );
// }
