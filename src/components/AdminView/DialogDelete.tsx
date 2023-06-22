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

  const closeHandler = () => {
    props.onClose(false);
  };

  const deleteHandler = () => {
    // setData!((prev) => {
    //   if (props.product !== null) {
    //     return {
    //       ...prev!.productItems.filter(
    //         (item) => item.productId !== props.product?.[0].productId
    //       ),
    //       ...prev!,
    //     };
    //   }
    //   if (props.package !== null) {
    //   }
    //   return prev;
    // });

    const dataStorage = JSON.parse(localStorage.getItem("data")!);
    if (props.package !== null) {
      const newData = dataStorage;
      console.log(newData);
    }
    if (props.package !== null) {
    }
    props.onClose(false);
  };

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
          ? This action is irreversible.
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
