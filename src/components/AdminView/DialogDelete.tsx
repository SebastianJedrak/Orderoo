import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { SetStateAction, useContext } from "react";
import { ProductsType } from "../../types";
import { ProductsContext } from "../../ctx/ProductsContext";

type Props = {
  isOpen: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  product: ProductsType["productItems"] | null;
  package: ProductsType["packages"] | null;
};

export default function DialogFormSubmit(props: Props) {
  const data = useContext(ProductsContext);
  const setData = data?.setData;
  const dataStorage: ProductsType = JSON.parse(localStorage.getItem("data")!);

  const closeHandler = () => {
    props.onClose(false);
  };

  const deleteHandler = () => {
    if (props.product !== null) {
      const updatedProducts = dataStorage.productItems
        .filter((item) => item.productId !== props.product?.[0].productId)
        .filter(
          (item) =>
            !item.productsRequired.some(
              (itemReq) => itemReq.id === props.product?.[0].productId
            )
        );

      const updatedPackages = dataStorage.packages.filter(
        (item) =>
          !item.productsIncludedId.some(
            (productId) => productId === props.product?.[0].productId
          )
      );
      const newData = {
        productItems: updatedProducts,
        packages: updatedPackages,
      };
      localStorage.setItem("data", JSON.stringify(newData));
      setData!(newData);
    }
    if (props.package !== null) {
    }
    props.onClose(false);
  };

  const packageToDelete = dataStorage.packages.filter((item) =>
    item.productsIncludedId.some(
      (productId) => productId === props.product?.[0].productId
    )
  );

  const packageToDeleteNames = packageToDelete.map((item) => item.packageName);

  const productRequiredToDelete = dataStorage.productItems.filter((item) =>
    item.productsRequired.some(
      (itemReq) => itemReq.id === props.product?.[0].productId
    )
  );

  const productRequiredToDeleteNames = productRequiredToDelete.map(
    (item) => item.productName
  );

  console.log(productRequiredToDelete);

  return (
    <Dialog open={props.isOpen} onClose={closeHandler}>
      <DialogTitle sx={{ px: 15, mb: 2 }} textAlign={"center"} color="primary">
        DELETE
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            textAlign: "center",
            color: "common.black",
            mb: 2,
          }}
        >
          Do you want to delete{" "}
          <Box
            component={"span"}
            color="secondary.dark"
            fontWeight="fontWeightBold"
          >
            {props.product && props.product?.[0].productName}
            {props.package && props.package?.[0].packageName}
          </Box>
          ? This action is irreversible. <br />
          {productRequiredToDelete.length > 0 && (
            <>
              Products which required deleted item will be removed:{" "}
              <Box
                component={"span"}
                color="secondary.dark"
                fontWeight="fontWeightBold"
              >
                {productRequiredToDeleteNames.join(", ")}
              </Box>
              .
            </>
          )}
          <br />
          {packageToDelete.length > 0 && (
            <>
              Packages containing this product will also be deleted:{" "}
              <Box
                component={"span"}
                color="secondary.dark"
                fontWeight="fontWeightBold"
              >
                {packageToDeleteNames.join(", ")}
              </Box>
              .
            </>
          )}
        </DialogContentText>
      </DialogContent>
      <Stack direction={"row"} justifyContent={"center"}>
        {" "}
        <DialogActions>
          <Button
            sx={{ width: "100px" }}
            variant="contained"
            autoFocus
            onClick={closeHandler}
          >
            No
          </Button>
        </DialogActions>
        <DialogActions>
          <Button
            sx={{ width: "100px" }}
            variant="outlined"
            onClick={deleteHandler}
          >
            Yes
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
